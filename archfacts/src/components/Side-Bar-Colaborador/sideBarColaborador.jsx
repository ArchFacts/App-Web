import React from "react";
import styles from "./sideBarColaborador.module.css"
import person from '../../utils/assets/person.png'
import folder from '../../utils/assets/pasta.png'
import house from '../../utils/assets/house.png'
import calendar from '../../utils/assets/calendar.png'
import sign from '../../utils/assets/sign.png';
import { Link } from "react-router-dom";

const SideBarColaborador = ( {redirecionarPerfil, onClickTarefa} ) => {
    return (
        <div className={styles.sideBar}>
       <Link to={"/home-prestador"}> <img className={styles.img} style={{width: '35px', height: '35px'}} src={house} alt="" /></Link>
        <Link to={"/projetos-prestador"}><img className={styles.img} style={{width: '35px', height: '35px'}} src={folder} alt="" /></Link>
        <Link to={"/eventos"}><img className={styles.img} style={{width: '35px', height: '35px'}} src={calendar} alt="" /></Link>
        <Link to={"/dashboard"}><img className={styles.img} style={{width: '35px', height: '35px'}} src={sign} alt="" /></Link>
        <Link to={"/perfil-prestador"}><img className={styles.img} style={{width: '35px', height: '35px'}} src={person} alt=""  onClick={redirecionarPerfil}/></Link>
        </div>
    )
}
export default SideBarColaborador;