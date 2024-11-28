import React from "react";
import styles from "./sideBar.module.css";
import person from '../../utils/assets/person.png';
import clipboard from '../../utils/assets/clipboard.png';
import house from '../../utils/assets/house.png';
import aperto from '../../utils/assets/aperto.png';
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className={styles.sideBar}>
          <Link to="/hub">  <img className={styles.img} style={{ width: '35px', height: '35px' }} src={house} alt="" /></Link>
            <Link to="/empresas-parceiras"><img className={styles.img} style={{width: '35px', height: '35px'}} src={aperto} alt="" /> </Link>
           <Link to="/projetos-beneficiario"> <img className={styles.img} style={{ width: '35px', height: '35px' }} src={clipboard} alt="" /></Link>
          <Link to="/perfil-beneficiario">  <img className={styles.img} style={{ width: '35px', height: '35px' }} src={person} alt="" /> </Link>
        </div>
    )


}
export default SideBar;