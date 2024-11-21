import React from "react";
import styles from "../Financeiro/financeiro.module.css";
import fall from "../../../utils/assets/fall.svg"
import rise from "../../../utils/assets/rise.svg"


const Financeiro = ({ valorPositivo, valorNegativo }) => {
    return (
        <div className={styles.financeiro}>
            <img src={rise} alt="" 
            width={60}
            height={60}/>
            <div className={styles.lucro}>
                <p>{valorPositivo}</p>
            </div>
            <div className={styles.gasto}>
                <p>{valorNegativo}</p>
            </div>
            <img src={fall} alt=""
            width={60}
            height={60} />
        </div>
    )
}

export default Financeiro;