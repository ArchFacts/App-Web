import React from "react";
import styles from "./sideBar.module.css"
import person from '../../utils/assets/person.png'
import clipboard from '../../utils/assets/clipboard.png'
import house from '../../utils/assets/house.png'
import aperto from '../../utils/assets/aperto.png'

const SideBar = () => {
    return (
        <div className={styles.sideBar}>
        <img className={styles.img} style={{width: '50px', height: '50px'}} src={house} alt="" />
        <img className={styles.img} style={{width: '50px', height: '50px'}} src={aperto} alt="" />
        <img className={styles.img} style={{width: '50px', height: '50px'}} src={clipboard} alt="" />
        <img className={styles.img} style={{width: '50px', height: '50px'}} src={person} alt="" />
        

        </div>

    )


}
export default SideBar;