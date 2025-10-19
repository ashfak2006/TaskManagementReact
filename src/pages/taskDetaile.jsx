import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import apiService from '../lib/apiService';
import Warningmessage from '../components/Warningmessage';
function TaskDetaile() {
    const {id} = useParams()
    const [error,seterror]=useState('');
    const [task,settask]=useState(null);
    const [loading,setloading]=useState(true);
    const navigate=useNavigate()

    const fetchData = async ()=>{
        try{
            const task = await apiService.apiRequest(`/tasks/${id}`,{
                method:'GET'
            });
            settask(task);
        }catch(error){
            seterror(error.message);
        }finally{
            setloading(false);
        }
    };

    useEffect(()=>{
        if(!id || isNaN(id)){
            seterror('invalid id');
            setloading(false);
        }else{
        fetchData();
      }
    },[])
    if(loading){return(<p>loading..........</p>)};
    if(error){return(<div><p>{error}</p> <button onClick={()=> navigate('/tasks')}>Go back</button></div>)}
  return (
    <div>
        <div key={task.id}>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>{task.status}</p>
        </div>
      <button onClick={()=>{navigate('/tasks')}}>Go back</button>
      <Warningmessage />
    </div>
  )
}

export default TaskDetaile
