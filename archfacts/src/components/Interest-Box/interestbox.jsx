import React from "react";
import styles from './interestbox.module.css'

const InterestBox = ({ title, text }) => {
    return (
        <div className={styles.interest_info}>
            <img src="" alt="" />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.text}>{text}</p>
            <div className={styles.button_div}>
                <button className={styles.button}>Quero essa solução!</button>
            </div>
        </div>
    );
}

export default InterestBox;