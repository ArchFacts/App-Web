import React, { useState } from 'react';
import styles from './verticalmenu.module.css';
import InfoItem from '../Info-Item/infoitem';
import icon1 from '../../utils/assets/gestao.svg'
import icon2 from '../../utils/assets/cliente.svg'
import icon3 from '../../utils/assets/number_one.svg'
import icon4 from '../../utils/assets/fluxo_caixa.svg'


const VerticalMenu = ({ setInfoBoxData }) => {
    const infoItems = [
        {
            icon: icon1,
            title: "Desorganização",
            description: "xxx"
        },
        {
            icon: icon2,
            title: "Comunicação com clientes",
            description: "xxx"
        },
        {
            icon: icon3,
            title: "Prorização de atividades",
            description: "xxx"
        },
        {
            icon: icon4,
            title: "Controle do fluxo de caixa",
            description: "xxx"
        },
    ];

    const handleIndex = (index) => {
        const item = infoItems[index];
        setInfoBoxData({
            icon: item.icon,
            title: item.title,
            text: item.description
        });
    };

    return (
        <div className={styles.menu_area}>
            <div className={styles.menuContainer}>
                <div className={styles.menu}>
                    {infoItems.map((item, index) => (
                        <InfoItem
                            key={index}
                            title={item.title}
                            index={index}
                            handleIndex={handleIndex}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerticalMenu;