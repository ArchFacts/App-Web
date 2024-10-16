import React, { useState } from 'react';
import styles from './infoitem.module.css';

const InfoItem = ({title, index, handleIndex}) => {
    return (
        <div 
        className={styles.problem}
        onMouseEnter={() => handleIndex(index)}>
            <p>{title}</p>
        </div>
    );
}

export default InfoItem;