import React from "react";
import SideBar from "../../../components/Side-Bar/sideBar";
import '../../../utils/global.css';
import styles from '../../Hub/Hub.module.css'
import stylesPerfil from '../perfil.module.css'

const perfilBeneficiario = () => {
    return(
        <>
          <div className={styles.container}>
                <SideBar/>
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}>Perfil</span>
                        <div className={styles.welcome}>
                        </div>
                    </div>
                    <div className={stylesPerfil.perfilContainer}>

                    </div>
                </div>
            </div>
        </>
    )    
}

export default perfilBeneficiario;