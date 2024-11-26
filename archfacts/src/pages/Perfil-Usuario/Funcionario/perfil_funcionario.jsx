import SideBar from "../../../components/Side-Bar/sideBar";
import '../../../utils/global.css';
import styles from '../../Hub/Hub.module.css'
import stylesPerfil from '../Funcionario/perfil.module.css'
import ProfileData from "../../../components/Profile-Data/profileData";
import Volks from "../../../utils/assets/volks.png";
import React, { useState } from "react";
import SideBarColaborador from '../../../components/Side-Bar-Colaborador/sideBarColaborador';


const PerfilFuncionario = () => {
    return (

        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <span className={styles.text}>Perfil</span>
                    <div className={styles.welcome}>
                    </div>
                </div>
                <div className={stylesPerfil.perfilContainer}>
                    <div className={stylesPerfil.esquerda}>
                        <img className={stylesPerfil.imagemPerfil} src={Volks} alt="" />
                        <h2>Luis Gustavo</h2>
                        <button className={stylesPerfil.botao}>Sair da conta</button>
                    </div>
                    <div className={stylesPerfil.direita}>

                        <ProfileData />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PerfilFuncionario;