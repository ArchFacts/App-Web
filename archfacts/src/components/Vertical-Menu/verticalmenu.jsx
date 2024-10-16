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
            description: "Um estudo conduzido pela Sebrae aponta que cerca de 79% das empresas brasileiras enfrentam sérios problemas de gestão, o que impactam no seu crescimento e sustentabilidade, portanto afetando o negócio a longo prazo."
        },
        {
            icon: icon2,
            title: "Comunicação com clientes",
            description: "Falhas na comunicação com o cliente se tornam um empecilho no seu negócio, gerando desgaste na relação, atraso na entrega do produto e no pior dos casos, erros pela má comunicação. No fim gerando uma perda para o negócio."
        },
        {
            icon: icon3,
            title: "Prorização de atividades",
            description: "Uma pesquisa realizada pela consultoria Falconi revelou a fragilidade na gestão das médias empresas no Brasil. Somente 10% das médias empresas tem planejamentos de longo prazo, a falta de planejamento gera queda na atividade econômica."
        },
        {
            icon: icon4,
            title: "Controle do fluxo de caixa",
            description: "Sem o controle do fluxo de caixa a sua empresa fica suscetível e imprevistos financeiros podem ser fatais. Um estudo realizado pelo IBGE em 2022 revela que 48% das empresas brasileiras fecham em até 3 anos por conta da má gestão financeira."            
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