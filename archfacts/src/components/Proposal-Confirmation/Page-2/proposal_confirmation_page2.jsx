import React, { useState } from "react";
import '../../../utils/global.css';
import styles from '../Page-1/proposal_confirmation_page1.module.css';
import BotaoLaranja from "../../Botao/botao_laranja_proposta.jsx";
import { useNavigate } from "react-router-dom";
import ServicesCarousel from "../../Services-Carousel/services_carousel.jsx";

const ProposalConfirmationPage2 = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleProposta1 = () => {
        navigate('/enviar-proposta1');
    };

    const handleProposta3 = () => {
        const selectedServices = document.querySelectorAll('.selected');
        selecionados
        if (selectedServices.length === 0) {
            setError(true);
        } else {
            setError(false);
            navigate('/enviar-proposta3');
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.container_proposta}>
                <div className={styles.container_itens}>
                    <h1>Selecione os serviços da Volkswagen</h1>
                    <div className={styles.paragrafo}>
                        <p className={styles.text}>
                            Escolha os serviços de sua necessidade para prosseguir com a sua proposta.
                        </p>
                    </div>

                    <div className={styles.enterprise_area}>
                        <ServicesCarousel />
                    </div>
                    {error && (
                        <div className={styles['alert-message']}>
                            <p>É necessário selecionar ao menos um serviço.</p>
                        </div>
                    )}

                    <div className={styles.buttons}>
                        <BotaoLaranja
                            texto="Voltar"
                            onClick={handleProposta1}
                            cor="#F95C00"
                        />
                        <BotaoLaranja
                            texto="Prosseguir"
                            onClick={handleProposta3}
                            cor=" #033E8C"
                        />
                    </div>
                    <div className={styles.progress_bar}>
                        <div className={styles.all_bar}>
                            <div className={styles.progress_individual2}></div>
                            <div className={styles.progress_individual1}></div>
                            <div className={styles.progress_individual2}></div>
                            <div className={styles.progress_individual2}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProposalConfirmationPage2;