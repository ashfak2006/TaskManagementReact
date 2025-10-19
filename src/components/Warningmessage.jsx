import React from 'react'
import apiService from '../lib/apiService';
function Warningmessage(props) {

    const DeleteTask = async (id)=>{
      console.log('delete is called')
        try{
          const response = await apiService.apiRequest(`/tasks/${id}/`,{
            method : 'DELETE'
          })
          console.log(response)
          props.fetchdata();
        }catch(error){
          console.log(error.message)
        
        }
    }
  return (
    <div>
       <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        // onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
      >
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-xl font-bold leading-6 text-gray-900" id="modal-title">
              Delete Task
            </h3>
            <div className="mt-2">
              <p className="text-md text-gray-600">
                Are you sure you want to delete the task <strong className="text-gray-800"></strong>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse sm:gap-4">
          <button
            type="button"
            onClick={()=>{DeleteTask(props.taskId); props.showWarning(false)}}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm transition-colors duration-300"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={()=>props.showWarning(false)}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
      `}</style>
    </div>
    </div>
  )
}

export default Warningmessage
