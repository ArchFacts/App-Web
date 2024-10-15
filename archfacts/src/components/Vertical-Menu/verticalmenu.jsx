import React from 'react';
import styles from './verticalmenu.module.css';
import InfoItem from '../Info-Item/infoitem';

const VerticalMenu = () => {
    return (
        <div className={styles.menu}>
            <InfoItem text="Desorganização"/>
            <InfoItem text="Comunicação com clientes"/>
            <InfoItem text="Priorização de atividades"/>
            <InfoItem text="Controle do fluxo de caixa"/>
        </div>

    );
};

export default VerticalMenu;
