import React from 'react';

const Button = ({ name, value, className, onClick }) => {
  return (
    <button
      name={name}
      className={`text-4xl font-bold text-white rounded-lg duration-500 hover:scale-95 ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
