import apiService from "./apiService";

class Authservice {
    constructor(){
        this.baseURL = 'http://127.0.0.1:8000';
    }

    setTokens(accessToken,refreshToken){
        localStorage.setItem('accessToken',accessToken);
        localStorage.setItem('refreshToken',refreshToken);
    }
    getAccessToken(){
        return localStorage.getItem('accessToken');
    }
    getRefreshToken(){
        return localStorage.getItem('refreshToken')
    }
    removeTokens(){
        localStorage.removeItem('accesToken');
        localStorage.removeItem('refreshToken');
    }

    async login(username,password){
        try{
            const response = await fetch('/api/token/',{
                method :'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
                
            })

            if (!response.ok){
                throw new Error('login failed');
            }
            const data = await response.json();
            console.log(data)
            this.setTokens(data.access,data.refresh);
            return data;
        }catch (error){
            throw error;
        }
    }
    async signup(username,email,password){
        try{
            const result = await fetch('/user/create/',{
            method:'POST',
             headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body:JSON.stringify({username,email,password})
            });
            console.log(result)
            if (!result.ok){
                throw new Error('signup failed');
            }
            if (result.status === 201){
                await this.login(username,password);
            }
            return result;    
        }catch (error){
            console.log(error.message)
            throw error;
        }
    }

    async refreshAccessToken(){
        const refreshToken = this.getRefreshToken();
        if (!refreshToken){
            throw new Error('no refresh token avalible');
        }

        try {
            const response = await fetch('/api/token/refresh/',{
                method: 'POST',
                headers:{
                    'content-type':'application/json',
                },
                body: JSON.stringify({
                    refresh:refreshToken,
                }),
            });

            if (!response.ok){
                throw new Error('Token refresh failed');
            }

            const data = await response.json();
           
            this.setTokens(data.access,refreshToken);
            return data.access;
        }catch (error){
            this.removeTokens();
            throw error;
        }
    }

    async logout(){
        const refresh = this.getRefreshToken();
        if(!refresh){
            console.log('no refresh token found');
            this.removeTokens();
            return;
        }
        try{ 
            const response = await apiService.apiRequest('/logout/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({refresh})
            });
        }catch(error){
            console.log('logout unsuccessfullly')
            throw error;
        }
        this.removeTokens();

    }

    isAuthenticated(){
        return !!this.getAccessToken()
    }
}

export default new Authservice();