import React from 'react';
import styles from './input.module.css'

function Input({ label, type, name, value, onChange, onBlur, error }) {
  return (
    <div className={styles.div_input}>
      <label>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
}

export default Input;