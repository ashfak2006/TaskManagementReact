import { useState,useEffect } from "react";
import HoverContent from "./components/hoverContent";


function App() {
  const [count,setcount] = useState(false);
  useEffect(()=>{
    console.log('mounting')
    return()=>{
      console.log('unmounting')
    }
},[count]);
  return (
    <div className="App">
      <button onClick={()=>{setcount(!count)}}>button</button>
      { count ?   <HoverContent/> : null }
      <h1 >react learning</h1>
    </div>
  );
}

export default App;
