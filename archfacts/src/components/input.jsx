import React from 'react';
import '../index.css';
import './input.css'

function Input({ label, type, name, value, onChange }) {
  return (
    <div className='div-input'>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Input;
