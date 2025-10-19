import React from 'react'
import { useState,useEffect } from 'react';
import './comp.css'

function HoverContent() {
  const data = {
  kerala : "thiruvananthapuram",
  delhi : "newdelhi",
  karnataka : "benguluru"
 } 
 const [State,setstate] = useState("kerala");
 const [capital,setcapital] = useState("thiruvananthapuram");
 const changestate = (e)=>{
    setstate(e.target.value);
    
    
 }

useEffect(()=>{
 setcapital(data[State])
},[changestate])
  return (
    <div>
      <select onChange={changestate} >
        <option value="kerala">kerala</option>
        <option value="delhi">delhi</option>
        <option value="karnataka"> karnataka</option>
      </select>
     <p>selected state {State}</p>
     <p>selected capital {capital}</p>
    </div>
  )
}

export default HoverContent;
