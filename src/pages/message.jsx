import React, { useEffect, useState } from 'react'
import apiService from '../lib/apiService'
import { CheckIcon,LogOut,MoveLeft } from 'lucide-react';
import Notifications from '../components/notifications';
import authservice from '../lib/authservice';
import { useNavigate } from 'react-router-dom';

function Message() {
    const [messages,setmessage] = useState([])
    const navigate = useNavigate()
    const [seeall,setseeall] = useState(false)
    const logout = async ()=>{
          await authservice.logout();
          navigate('/');
    }
    const get_messages = async ()=>{
        console.log("message function called")
        let url = '/tasks/setduemessage/?page=1';
        if (seeall===true){url='/tasks/setduemessage/?all=true'}
        try{
           const message = await apiService.apiRequest(
               url,{method:'GET'}
            )
            console.log(message)
            setmessage(message)
        }catch(error){
            console.log(`messages${error.message}`)
        }
    }

    const MarkallAsRead = async ()=>{
      try{
        const response = await apiService.apiRequest('/tasks/setduemessage/markallasread/',{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body:JSON.stringify({is_read:true})
        })
        get_messages();
        console.log(response)
      }catch(error){
        console.log(error.message)
      }
    }
    useEffect(()=>{
        get_messages()
    },[seeall]);
  return (

    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col flex-row justify-between items-start gap-2">
          <div>
            <h1 className="text-3xl  font-bold text-gray-900 mb-2">Task Management</h1>
            <p className="text-gray-600">Organize and track your tasks efficiently</p>
          </div>
          <div className='flex items-center gap-4'>
            
            <button onClick={()=>{navigate('/tasks')}}><MoveLeft /></button>
            <button className='' onClick={logout}><LogOut /></button>
          </div>
        </div>


    <div className="bg-white rounded-2xl shadow-xl w-full  mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
          
          <button onClick={MarkallAsRead} className="flex items-center space-x-1 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
            <CheckIcon className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div> 

      <div className="px-6 pb-4">
        <div className="border-t border-slate-100"></div>
        <h3 className="text-sm font-semibold text-slate-500 pt-4 pb-2">Today</h3>
        <div className="space-y-2">
       {messages.map(message=>(
      <Notifications key={message.id} message={message}/>
      ))}
      </div>
      </div>
      <div className="border-t border-slate-100 mt-2">
        {!seeall && 
        <button onClick={()=>{setseeall(true)}} className="w-full text-center py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-b-2xl transition-colors">
          View all notifications
        </button>
        }
        {seeall &&
        <button onClick={()=>{setseeall(false)}} className="w-full text-center py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-b-2xl transition-colors">
          View less 
        </button>
        }
      </div>
    </div>
    <div/>
    </div>
    </div>
  )
}

export default Message
