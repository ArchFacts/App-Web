import React from 'react';
import styles from './simple_header.module.css';

function SimpleHeader() {
    return (
        <div className={styles.header}>
            <div className={styles.imagens}>
            <a href='/'> <img  className={styles.imagens_logo} id='logoImage' src="../../utils/assets/imgs/logo.svg" alt="" /></a>
            <a href="/"> <img className={styles.imagens_af} id='logoLetter' src="../../utils/assets/imgs/logo_af.png" alt="" /></a>
            </div>
            <div className={styles.label}>
                <a href="/"><div className={styles.labels}> Início</div></a> 
            <a href="/"> <div className={styles.labels_login}>
                    Login 
                </div> </a>
            </div>
        </div>
    )
}

export default SimpleHeader;