import React from 'react';
import styles from './input_proposta.module.css'

function InputProposta({ label, type, name, value, onChange}) {
  return (
    <div className={styles.div_input}>
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

export default InputProposta;