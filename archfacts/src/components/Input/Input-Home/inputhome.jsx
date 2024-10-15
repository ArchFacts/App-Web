import React from "react";
import styles from './inputhome.module.css'

const InputHome = ({ label, type, name, value, onChange }) => {
    return (
        <div className={styles.div_input_box}>
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
        </div>
    );
}

export default InputHome