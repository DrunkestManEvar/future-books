import React from 'react';

const Input = React.forwardRef(
  ({ type, placeholder, value, handleInputChange }, ref) => {
    return (
      <input
        type={type}
        className={`input input_${type}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        ref={ref}
      />
    );
  }
);

export default Input;
