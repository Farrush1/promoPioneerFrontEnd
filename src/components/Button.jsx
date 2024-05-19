import React from 'react';

const Button = ({ onClick, color, children }) => {
  return (
    
    <button
      className={`px-3 py-1 rounded center ${color === 'blue' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
      onClick={onClick}
    >
      {children}
    </button>
    
  ); 
};

export default Button;