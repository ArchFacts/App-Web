import React from "react";
import styles from "./herofooter.module.css"
import { Icon } from '@iconify/react';
import icone_gestao from '../../utils/assets/gestao.svg'
import icone_parceria from '../../utils/assets/parceria.svg'
import icone_cliente from '../../utils/assets/cliente.svg'

const HeroFooter = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.points}>
                <div className={styles.point}>
                    <div className={styles.circle}></div>
                    <img src={icone_gestao} alt="" />
                    <p>Gestão</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.point}>
                    <div className={styles.circle}></div>
                    <img src={icone_parceria} alt="" />
                    <p>Parceria</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.point}>
                    <div className={styles.circle}></div>
                    <img src={icone_cliente} alt="" />
                    <p>Clientes</p>
                </div>
            </div>
        </div>
    );
};

export default HeroFooter;