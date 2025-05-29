import React from "react";
import styles from "./herofooter.module.css"
import icone_gestao from '../../utils/assets/gestao.svg'
import icone_parceria from '../../utils/assets/parceria.svg'
import icone_cliente from '../../utils/assets/cliente.svg'

const HeroFooter = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.points}>
                <div className={styles.point}>
                    <div className={styles.circle}></div>
                    <img src={icone_gestao} style={{ width: "10%" }} />
                    <p>Gestão</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.point}>
                    <div className={styles.circle}></div>
                    <img src={icone_parceria} style={{ width: "12%" }} />
                    <p>Parceria</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.point}>
                    <div className={styles.circle}></div>
                    <img src={icone_cliente} style={{ width: "10%" }} />
                    <p>Clientes</p>
                </div>
            </div>
        </div>
    );
};

export default HeroFooter;