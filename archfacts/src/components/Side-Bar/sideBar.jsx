import React from "react";
import styles from "./sideBar.module.css"
import person from '../../utils/assets/person.png'
import clipboard from '../../utils/assets/clipboard.png'
import house from '../../utils/assets/house.png'

const SideBar = () => {
    return (
        <div className={styles.sideBar}>
        <img className={styles.img} style={{width: '40px', height: '40px'}} src={person} alt="" />
        <img className={styles.img} style={{width: '40px', height: '40px'}} src={house} alt="" />
        <img className={styles.img} style={{width: '40px', height: '40px'}} src={clipboard} alt="" />
        </div>

    )


}
export default SideBar;