import React from "react";
import '../../utils/global.css';
import styles from './proposal_confirmation.module.css';
import image from '../../utils/assets/volks.png';
import BotaoLaranja from "../Botao/botao_laranja_proposta.jsx";
import { useNavigate } from "react-router-dom";

const ProposalConfirmation = () => {

    const navigate = useNavigate();

    const handleEmpresasParceiras = () => {
        navigate('/empresas-parceiras');
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Envio de proposta</h1>
                        <div className={styles.paragrafo}>
                        <p>Você está prestes a enviar uma solicitação para Ecorp.</p>
                        <p> Confirme se essa é a empresa com a qual você deseja enviar a proposta.</p>
                        </div>
                        <div className={styles.enterprise_area}>
                            <div className={styles.name_logo}>
                                <h2>Volkswagen</h2>
                                <img src={image} alt="Logo da empresa" />
                            </div>
                            <div className={styles.informations}>
                                <p className={styles.information_text}>Média de avaliações: <span></span> 4.3</p>
                                <p className={styles.information_text}>Serviços totais prestados: 15</p>
                                <p className={styles.information_text}> Serviço mais escolhido: Carros esportivos.</p>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <BotaoLaranja
                                texto="Voltar para seleção"
                                onClick={handleEmpresasParceiras}
                                cor="#F95C00"
                            />
                            <BotaoLaranja
                                texto="Continuar"
                                onClick={handleEmpresasParceiras}
                                cor=" #033E8C"
                            /></div>
                        <div className={styles.progress_bar}>
                            <div className={styles.all_bar}>
                                <div className={styles.progress_individual1}>

                                </div>

                                <div className={styles.progress_individual2}>

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

export default ProposalConfirmation;