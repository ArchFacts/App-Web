import React from 'react';
import styles from './infobox.module.css';

const InfoBox = ({ icon, title, text }) => {
    return (
        <div className={styles.info_box}>
            <img src={icon} alt="" />
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.text}>{text}</p>
        </div>
    );
}

export default InfoBox