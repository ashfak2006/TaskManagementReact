import React from 'react';

const TaskLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      {/* Clock */}
      <div className="relative w-16 h-16 border-4 border-blue-500 rounded-full animate-spin-slow">
        <div className="absolute top-1/2 left-1/2 w-1 h-6 bg-blue-700 transform -translate-x-1/2 -translate-y-full origin-bottom"></div>
      </div>

      {/* Gears */}
      <div className="flex space-x-4">
        <div className="w-8 h-8 bg-blue-300 rounded-full animate-spin"></div>
        <div className="w-8 h-8 bg-blue-400 rounded-full animate-spin-reverse"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-spin-slow"></div>
      </div>

      {/* Checkmark */}
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-2 rounded ${
              i % 2 === 0 ? 'bg-blue-500' : 'bg-blue-300'
            } animate-fade-in`}
            style={{ animationDelay: `${i * 200}ms` }}
          ></div>
        ))}
      </div>

      <p className="text-blue-700 font-medium">Loading tasks...</p>
    </div>
  );
};

export default TaskLoader;
