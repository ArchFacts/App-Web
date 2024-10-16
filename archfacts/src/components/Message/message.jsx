import React from "react";
import styles from "./message.module.css"

const Message = ({ label, type, name, value, onChange }) => {
    return (
        <div className={styles.message_area}>
            <div className={styles.div_input}>
                <label>{label}</label>
                <textarea
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    rows={5}
                />
            </div>
        </div>
    );
};

export default Message