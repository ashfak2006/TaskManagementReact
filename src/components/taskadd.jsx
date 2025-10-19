import React, { useState } from 'react'
import ApiService from '../lib/apiService'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
X,
} from 'lucide-react';
import TaskLoader from './loading';


function Taskadd(props) {
  const [formdata,setformdata] = useState({})
  const [error,seterror] = useState('')
  const [loading,setloading] = useState(false)
  const [succes,setsucces] = useState(false)
  const handlereset = ()=>{
    setformdata({})
  }
  const handleSubmit = async ()=>{
    setloading(true);
    if(!formdata.title || !formdata.description){
      seterror('pleease fill all the fields')
      return;
    }
    seterror('')
    try{
      const title = formdata.title;
      const description = formdata.description;
      const due_date = formdata.due_date
      const priority = formdata.priority;
      const status = 'pending'
      const response = await ApiService.apiRequest('/tasks/',{
        method:'POST',
        headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
        body:JSON.stringify({title,description,priority,due_date})
      });
      console.log(`post data body${JSON.stringify({title,description,priority,due_date})}`)
      setsucces(true)
      handlereset()
      seterror('')
    }catch(error){
      seterror(error.message)
    }finally{
      props.fetchdata();
      props.handleclose();
      setloading(false)
    }
  }
  return (
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
        {error && <p style={{color:'red'}}>{error}</p>}
        {succes && <p style={{color:'green'}}>created succusfullly</p>}
            <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
                <button
                  onClick={()=>{props.handleclose()}}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                   
                    value={formdata.title} 
                    onChange={(e)=>setformdata({...formdata,title:e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formdata.description} 
                    onChange={(e)=>setformdata({...formdata,description:e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                    placeholder="Enter task description..."
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Set Remainder
                  </label>
                  <DatePicker
                    selected={formdata.due_date} 
                    onChange={(e)=>setformdata({...formdata,due_date:e})}
                    dateFormat="MMMM d,YYYY h:mm aa"
                    placeholderText="Select a date"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formdata.priority} 
                    onChange={(e)=>setformdata({...formdata,priority:e.target.value})}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <p>is important</p>
                </div>
                <div className="flex items-center justify-between mt-6">
               
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                >
                  SUBMIT
                </button>
              </div>

                {/* Category */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="General">General</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Research">Research</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div> */}
                {loading && <TaskLoader/> }
              </div>
              </div>
              </div>
      
  )
}

export default Taskadd
