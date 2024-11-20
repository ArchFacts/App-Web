import React from "react";
import styles from "./sideBarColaborador.module.css"
import person from '../../utils/assets/person.png'
import clipboard from '../../utils/assets/clipboard.png'
import folder from '../../utils/assets/pasta.png'
import house from '../../utils/assets/house.png'
import calendar from '../../utils/assets/calendar.png'
import sign from '../../utils/assets/sign.png'

const SideBarColaborador = () => {
    return (
        <div className={styles.sideBar}>
        <img className={styles.img} style={{width: '60px', height: '60px'}} src={house} alt="" />
        <img className={styles.img} style={{width: '60px', height: '60px'}} src={folder} alt="" />
        <img className={styles.img} style={{width: '60px', height: '60px'}} src={calendar} alt="" />
        <img className={styles.img} style={{width: '60px', height: '60px'}} src={clipboard} alt="" />
        <img className={styles.img} style={{width: '60px', height: '60px'}} src={sign} alt="" />
        <img className={styles.img} style={{width: '60px', height: '60px'}} src={person} alt="" />
        </div>
    )
}
export default SideBarColaborador;