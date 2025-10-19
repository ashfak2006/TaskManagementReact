import authservice from "./authservice";

class ApiService{
    constructor(){
        // this.baseURL = 'http://127.0.0.1:8000';
    }

    async apiRequest(endpoint,options = {}){
        const URL = `${endpoint}`;

        let accesToken = authservice.getAccessToken();

        const config ={
            headers: {
                'content-type': 'applicaton/json',
                ...options.headers,
            },
            ...options,
        };

        if(accesToken){
            config.headers['Authorization'] = `Bearer ${accesToken}`;
        }

        try{
            let response = await fetch(endpoint,config);
             console.log(response)
            if(response.status == 403 && accesToken){
                console.log('try to refresh')
                try{
                    accesToken = await authservice.refreshAccessToken();

                    config.headers['Authorization'] = `Bearer ${accesToken}`;
                    response = await fetch(endpoint,config);
                }
                catch (refreshError){
                    authservice.logout();
                    console.log(refreshError.message)
                    throw new Error('authentication failed');
                }
            }
            if (!response.ok){
                console.log(`Authentication Error !status ${response.status}`)
                console.log(response)
                throw new Error(`Authentication Error !status ${response.status}`);
            }
            
            const content_length = response.headers.get('content-length')
             console.log(content_length)
            if (content_length==0){
                console.log('length is 0')
                return ;
            }else{
            return  await response.json();
            }
        }catch (error){
            throw error;
        }
    }

}
export default new ApiService();