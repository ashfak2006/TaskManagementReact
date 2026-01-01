import React from 'react'
import { Link, useActionData, useNavigate } from 'react-router-dom';
import apiService from '../lib/apiService'
import authservice from '../lib/authservice';
import { useState,useEffect } from 'react'
import Taskadd from '../components/taskadd';
import TaskLoader from '../components/loading';
import { 
  Plus,
  Flag,
  Star,
CheckCircle2,
LogOut, 
MoveLeft,
MoveRight,
Circle,
Bell,
Search,
Trash2

} from 'lucide-react';
import Warningmessage from '../components/Warningmessage';

function Tasks() {
    const [loading,setloading]=useState(false);
    const [tasks,settasks] = useState([])
    const [error,seterror]=useState('');
    const [next,setnext]=useState('');
    const [urlpage,seturlpage]=useState('');
    const [previous,setprevious]=useState('');
    const [taskadd,settaskadd]=useState(false);
    const [notiCount,setNotyCount] = useState(0);
    const navigate=useNavigate()
    const [showWarning, setShowWarning] = useState(false);
    const [filter,filterSet] = useState(
      { task_status: 'all',
        search: ''
      })
    
    const logout = async ()=>{
      await authservice.logout();
      navigate('/');
    }
    const handleclose =()=>{
      settaskadd(false)
    };
     
    const setNoty = async ()=>{
      const count = await apiService.apiRequest('/tasks/notifications/count/',{
        method :'GET'
      })
      console.log('count')
      let nottiCount = Number(count.unread_count);

      setNotyCount(nottiCount);
      // console.log(count.unread_count)
      console.log(notiCount)
    };



    const setCompleted = async (id,Completed)=>{
      try{
        let value = Completed;
 
        const response = await apiService.apiRequest(`/tasks/${id}/`,{
          method : 'PATCH',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body:JSON.stringify({IS_COMPLETED:value})
        })
        
        fetchdata();
      }catch(error){
        console.log(error.message)
        seterror(error.message)
      }
    }
    const fetchdata = async ()=>{
          setloading(true)
          try{
             let url = '/tasks/';
             if (filter.task_status !== 'all' && filter.search === ''){
              url = `/tasks/?task_status=${filter.task_status}`;
             }
             if (filter.search !== '' && filter.task_status !== 'all'){
              url = `/tasks/?task_status=${filter.task_status}&search=${filter.search}`;
             }
              if (filter.search !== '' && filter.task_status ==='all'){
                url = `/tasks/?search=${filter.search}`;
              }
              if (urlpage === next){
                url = next;
              }
              if (urlpage === previous){
                url = previous;
              }
             
              const tasksData = await apiService.apiRequest(url,{
                  method:'GET'
              });
              settasks(tasksData.results);
              setnext(tasksData.next);
              setprevious(tasksData.previous);
              seterror('');
         
          }catch(error){
              seterror(error.message);
          }finally{
              setloading(false);
            
          }
    }
    useEffect(()=>{
      fetchdata();
     
    },[filter,urlpage]);

  
   setNoty();
  const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
  };


  const priorityIcons = {
  low: <Flag className="w-3 h-3" />,
  medium: <Flag className="w-3 h-3" />,
  high: <Flag className="w-3 h-3" />
  };
  
  // console.log(`${tasks}tasks`)
  // console.log(tasks)

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col flex-row justify-between items-start gap-2">
          <div>
            <h1 className="text-3xl  font-bold text-gray-900 mb-2">Task Management</h1>
            <p className="text-gray-600">Organize and track your tasks efficiently</p>
          </div>

          <div className='flex items-center gap-4'>
            <button className='' onClick={logout}><LogOut /></button>
          {notiCount > 0 && 
          <div>
           <span className='w-3 h-3 rounded-full mr-2 bg-red-500 flex items-center justify-center text-white text-xs'>{notiCount}</span>
            <Bell onClick={()=>{navigate('user/message')}}/></div>
          }
          {notiCount === 0 &&
            <Bell onClick={()=>{navigate('user/message')}}/>
          }
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center ">
              {!taskadd && 
                <button
                      onClick={()=>{  
                        settaskadd(true)}}
                      className="px-6 mb-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Add Task 
            </button> 
            }
              {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={filter.search}
                      onChange={(e) => filterSet({...filter,search:e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
            {/* Filter */}
            <select    
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>{filterSet({...filter,task_status:e.target.value})}}
            >
              <option value="all">all</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
             
            </select>
      </div>
        {tasks.map(task=>(
           
           <div
                key={task.id}
                navigate={`/tasks/${task.id}`}
                className={`bg-white rounded-xl mb-4 p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
                  task.IS_COMPLETED 
                    ? 'border-green-400 bg-green-50 bg-opacity-30' 
                    
                    : 'border-gray-100'
                }${task.is_due && ' border-red-400 bg-red-50 bg-opacity-30'}`}>
              
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => setCompleted(task.id,!task.IS_COMPLETED)}
                    className={`mt-1 flex-shrink-0 transition-colors duration-200 ${
                      task.IS_COMPLETED ? 'text-green-600' : 'text-gray-400 hover:text-green-500'
                    }`}
                  >
                    {task.IS_COMPLETED ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

        <div  className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Task Details */}
                        <Link to={`/tasks/${task.id}`}>{task.title}
                        <h3 className={`font-semibold text-lg mb-1 ${
                          task.IS_COMPLETED ? 'line-through text-gray-500' : 'text-gray-900'
                        }${task.is_due && ' text-red-600'}`}>
                          {task.title}
                          {task.is_important && (
                            <Star className="inline-block w-4 h-4 text-yellow-500 fill-current ml-2" />
                          )}

                        </h3>
                        </Link>
                        {task.description && (
                          <p className={`text-sm mb-3 ${
                            task.IS_COMPLETED ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {task.description}
                          </p>
                        )}

                        {/* Tags and Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {/* Priority */}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${priorityColors[task.priority]}`}>
                            {priorityIcons[task.priority]}
                            {task.priority}
                          </span>

                        </div>
                      </div>
                      
                     </div>
                    
        </div>
        {showWarning && <Warningmessage setShowWarning={setShowWarning} fetchdata={fetchdata} taskId={task.id}/> }
         <div className="flex items-end mt-4">
          <button onClick={()=>{setShowWarning(true)}}>
            <Trash2 color="#9e0505" strokeWidth={1} />
          </button></div>
        </div>
        </div>
        
        ))}

        <div className="flex justify-between items-center mt-4">
          {previous &&
            <button onClick={()=>{seturlpage(previous)}}>
            Previous
            <MoveLeft  />
            </button>
          }
            {next &&
            <button className='i' onClick={()=>{seturlpage(next)}}>
               Next
              <MoveRight />
            </button>
            }
        </div>
       

      {error && <div><p style={{ color: "red"}}>{error}</p><button onClick={()=> navigate(-1)}>Go back</button></div>}
      

      {taskadd && <Taskadd handleclose={handleclose} fetchdata={fetchdata}/> }
      
        
        
    </div>
    </div>
    </div>
    
  )
}

export default Tasks;