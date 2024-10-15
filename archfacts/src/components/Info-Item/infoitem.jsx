import React from 'react';
import styles from './infoitem.module.css';

const InfoItem = ({text}) => {
    return (
        <div className={styles.problem}>
            <p>{text}</p>
        </div>
    );
}

export default InfoItem;