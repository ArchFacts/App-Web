import React from "react";
import styles from "./sideBarColaborador.module.css"
import person from '../../utils/assets/person.png'
import clipboard from '../../utils/assets/clipboard.png'
import folder from '../../utils/assets/pasta.png'
import house from '../../utils/assets/house.png'
import calendar from '../../utils/assets/calendar.png'
import sign from '../../utils/assets/sign.png'

const SideBarColaborador = ( {redirecionarPerfil} ) => {
    return (
        <div className={styles.sideBar}>
        <img className={styles.img} style={{width: '35px', height: '35px'}} src={house} alt="" />
        <img className={styles.img} style={{width: '35px', height: '35px'}} src={folder} alt="" />
        <img className={styles.img} style={{width: '35px', height: '35px'}} src={calendar} alt="" />
        <img className={styles.img} style={{width: '35px', height: '35px'}} src={clipboard} alt="" />
        <img className={styles.img} style={{width: '35px', height: '35px'}} src={sign} alt="" />
        <img className={styles.img} style={{width: '35px', height: '35px'}} src={person} alt=""  onClick={redirecionarPerfil}/>
        </div>
    )
}
export default SideBarColaborador;