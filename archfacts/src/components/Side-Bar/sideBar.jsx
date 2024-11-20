import React from "react";
import styles from "./sideBar.module.css"
import person from '../../utils/assets/person.png'
import clipboard from '../../utils/assets/clipboard.png'
import house from '../../utils/assets/house.png'

const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <img className={styles.img} style={{ width: '35px', height: '35px' }} src={house} alt="" />
            <img className={styles.img} style={{ width: '35px', height: '35px' }} src={clipboard} alt="" />
            <img className={styles.img} style={{ width: '35px', height: '35px' }} src={person} alt="" />
        </div>
    )


}
export default SideBar;