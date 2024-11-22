import React from "react";
import styles from './openProposal.module.css'
import right_icon from '../../utils/assets/right_check.svg'
import wrong_icon from '../../utils/assets/wrong_check.svg'
import download_icon from '../../utils/assets/download.svg'


const OpenProposal = ({ solicitante, servicos }) => {
    return (
        <div className={styles.content}>
            <span>{solicitante}</span>
            <span>{servicos}</span>
            <span><img className={styles.img} src={download_icon} alt="" 
            width={60}
            height={60}/></span>
            <span className={styles.aceitarRecusar}>
                <img className={styles.img} src={right_icon} alt=""
                width={60}
                height={60}/>
                <img className={styles.img} src={wrong_icon} alt="" 
                width={60}
                height={60}/>
            </span>
        </div>
    )
}
export default OpenProposal;