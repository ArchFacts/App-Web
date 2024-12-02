import React from "react";
import '../../utils/global.css';
import styles from './service_card.module.css';

const ServiceCard = ({ img, title, text, isSelected, onClick }) => {
    return (
        <div
            className={`${styles.card_container} ${isSelected ? styles.selected : ""}`}
            onClick={onClick}
        >
            <img className={styles.card_image} src={img} alt="Foto do serviço" />
            <p className={styles.card_title}>{title}</p>
            <p className={styles.card_text}>{text}</p>
        </div>
    );
};

export default ServiceCard;
