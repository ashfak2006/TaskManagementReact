import React from 'react';
import { useState } from 'react';
import authservice from '../lib/authservice';
import TaskLoader from '../components/loading';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';



function Home() {
  const [formdata,setformdata]=useState({username:'',password:''});
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState('');
  const [succes,setsucces]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async ()=>{
    setloading(true);
    if (!formdata.username || !formdata.password){
      seterror('please fill all fields');
      return;
    }
    
    seterror('');

    setTimeout(async()=>{
      try{
        const username = formdata.username;
        const password = formdata.password;
        await authservice.login(username,password);
        setsucces(true);
        navigate('/tasks')
      }catch(errror){
        seterror(errror.message);
      }
      
    });
    setloading(false);
  }
  if (loading){
    return (<div><TaskLoader/></div>)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* //* Decorative background elements */ }
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Main login container */}
      <div className="relative w-full max-w-md">
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20"></div>
        
        <div className="relative z-10 p-8 sm:p-12">
          {/* Logo/Brand area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to your task management account
            </p>
          </div>

      {error &&<
        div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
        </div>
}
      {succes && <p style={{ color: "green"}}>login completed</p>}
     
      <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formdata.username}
                  onChange={(e)=>setformdata({...formdata,username: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-white bg-opacity-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your username"
                />
              </div>
      </div>
      <div className="space-y-2 pt-4">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formdata.password} onChange={(e)=>setformdata({...formdata,password:e.target.value})}
                  className="w-full pl-12 pr-12 py-3.5 bg-white bg-opacity-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your password"

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                  
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
        <button
              onClick={handlesubmit}
              className="w-full py-3.5 px-6 rounded-xl font-medium text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                
               bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
            >sign in</button>

          <div className="mt-8 text-center">
            <span className="text-gray-600 text-sm">Don't have an account? </span>
            <button
            onClick={()=>navigate('/signup')}
              type="button"
              className="text-blue-600 hover:text-blue-500 font-medium text-sm transition-colors"
            >
              Sign up here
            </button>
          </div>

       
    </div>
    </div>
    </div>
  )
}

export default Home
