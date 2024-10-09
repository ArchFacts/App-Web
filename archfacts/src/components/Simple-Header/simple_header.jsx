import React from 'react';
import styles from './simple_header.module.css';
import logo from '../../utils/assets/logo.svg';
import logoaf from '../../utils/assets/logo_af.png';

function SimpleHeader() {
    return (
        <div className={styles.header}>
            <div className={styles.imagens}>
            <a href='/'>  <img src={logo}  className={styles.imagens_logo} id='logoImage' alt='logo'  /></a>
            <a href="/"> <img src={logoaf} className={styles.imagens_af} id='logoLetter' alt='logo_af'  /></a>
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