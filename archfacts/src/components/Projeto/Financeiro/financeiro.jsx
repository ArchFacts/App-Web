import React from "react";
import styles from "../Financeiro/financeiro.module.css";
import fall from "../../../utils/assets/fall.svg"
import rise from "../../../utils/assets/rise.svg"
import dash_icon from '../../../utils/assets/dash_icon.svg';


const Financeiro = ({ valorPositivo, valorNegativo, handleDashClick  }) => {
    return (
        <div className={styles.financeiro} onClick={handleDashClick}>
            <h1>VER DASHBOARD</h1>
            {/* <img src={rise} alt="" 
            width={60}
            height={60}/>
            <div className={styles.lucro}>
                <p>{valorPositivo}</p>
            </div>
            <img src={dash_icon} alt="" id="dash" />
            <div className={styles.gasto}>
                <p>{valorNegativo}</p>
            </div>
            <img src={fall} alt=""
            width={60}
            height={60} /> */}
        </div>
    )
}

export default Financeiro;