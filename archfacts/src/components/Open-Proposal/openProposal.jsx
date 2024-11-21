import React from "react";
import styles from './openProposal.module.css'
import download from '../../utils/assets/download.png'
import accept from '../../utils/assets/accept.png'
import reject from '../../utils/assets/reject.png'

const OpenProposal = ({solicitante, servicos}) => {
    return (
        <div className={styles.content}>
           <span>{solicitante}</span>
           <span>{servicos}</span>
           <span><img className={styles.img} src={download} alt="" /></span>
           <span className={styles.aceitarRecusar}>
                <img className={styles.img} src={accept} alt="" />
                <img className={styles.img} src={reject} alt="" />
            </span>
        </div>
    )
}
export default OpenProposal;