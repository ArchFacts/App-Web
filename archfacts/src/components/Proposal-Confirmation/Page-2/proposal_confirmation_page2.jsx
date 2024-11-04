import React from "react";
import '../../../utils/global.css';
import styles from '../Page-1/proposal_confirmation_page1.module.css';
import image from '../../../utils/assets/volkswagen.svg';
import BotaoLaranja from "../../Botao/botao_laranja_proposta.jsx";
import { useNavigate } from "react-router-dom";

const ProposalConfirmationPage2 = () =>{

    const navigate = useNavigate();

    const handleProposta2 = () => {
        navigate('/enviar-proposta1');
    };

    return(
        <>
        <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Selecione os serviços da Volkswagen</h1>
                        <div className={styles.paragrafo}>
                            <p className={styles.text}>Escolha os serviços de sua necessidade para prosseguir com a sua proposta.</p>
                        </div>
                        <div className={styles.enterprise_area}>
                            <div className={styles.name_logo}>
                                <div className={styles.enterprise_name}>Carros econômicos</div>
                                <img className={styles.enterprise_image} src={image} alt="Logo da empresa" />
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <BotaoLaranja
                                texto="Voltar"
                                onClick={handleProposta2}
                                cor="#F95C00"
                            />
                            <BotaoLaranja
                                texto="Continuar"
                                onClick={handleProposta2}
                                cor=" #033E8C"
                            /></div>
                        <div className={styles.progress_bar}>
                            <div className={styles.all_bar}>
                                <div className={styles.progress_individual2}>

                                </div>

                                <div className={styles.progress_individual1}>

                                </div>
                                <div className={styles.progress_individual2}>

                                </div>
                                <div className={styles.progress_individual2}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProposalConfirmationPage2; 