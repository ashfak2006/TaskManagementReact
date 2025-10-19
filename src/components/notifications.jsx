import React, { useEffect } from 'react'
import { useState } from 'react';
import {AlarmClockCheck } from 'lucide-react';
import FormattedDate from '../lib/FormateTime';



function Notifications(props) {

  const [isOpen,setisOpen] = useState(false);
  useEffect(()=>{
    if (props.message.is_read === false){
      setisOpen(true);
    }
  },[props.message.is_read])
  return (
    <div>
       <div className='flex items-start space-x-4 p-4 rounded-xl bg-slate-100'>
      <div className='flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center '>
        {/* FIX: Replaced React.cloneElement with direct component rendering to fix the type error. */}
        {/* <config.icon className={`w-6 h-6 ${config.iconColor}`} /> */}
        <AlarmClockCheck className='w-6 h-6 text-green-500'/>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          {!props.message.is_read &&
            <span className='w-2 h-2 rounded-full mr-2 bg-red-500'></span>
          }
           <h3 className="font-bold text-slate-800 text-sm">{props.message.hedder}</h3>
          </div>
          <p className="text-xs text-slate-400"><FormattedDate timestamp={props.message.timestamp}/> </p>
        </div>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          {props.message.content}
        </p>
      </div>
    </div>
    </div>
  )
}

export default Notifications
