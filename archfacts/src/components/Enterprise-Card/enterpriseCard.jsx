import React from "react";
import styles from "./enterpriseCard.module.css"

const EnterpriseCard = ({ img, title, buttonText, ticketQuantity, rating, onClickEmpresa }) => {
    return (
        <div className={styles.card}>
            <div className={styles.leftCard}>
                <img className={styles.imagemEmpresa} src={img} alt="" />
            </div>
            <div className={styles.rightCard}>
                <h2>{title}</h2>
                <h3>Avaliação: <span style={{ color: '#F95C00' }}>{rating}</span></h3>
                <h3>Chamados com o prestador: 0</h3>

                <button className={styles.cardButton}
                    onClick={onClickEmpresa}>{buttonText}</button>
            </div>

        </div>
    )
}
export default EnterpriseCard;