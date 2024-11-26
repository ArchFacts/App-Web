import React, { useEffect, useState } from "react";
import '../../../utils/global.css';
import styles from './proposal_confirmation_page1.module.css';
import image from '../../../utils/assets/volkswagen.svg';
import BotaoLaranja from "../../Botao/botao_laranja_proposta.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import api, { imagemGenerica } from "../../../api.jsx";
import Spinner from "../../Spinner/spinner.jsx";

const ProposalConfirmationPage1 = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { negocio } = location.state || {};

    const handleEmpresasParceiras = () => {
        navigate(`/empresas-parceiras1/${negocio.codigo}/${negocio.nome}`);
    };

    const handleProposta2 = () => {
        navigate(`/enviar-proposta2/${negocio.codigo}/${negocio.nome}`);
    };

    if (!negocio) {
        return <p>Dados da empresa não encontrados.</p>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Envio de proposta</h1>
                        <div className={styles.paragrafo}>
                            <p className={styles.text}>Você está prestes a enviar uma solicitação para Ecorp.</p>
                            <p className={styles.text}> Confirme se essa é a empresa para a qual deseja enviar a proposta.</p>
                        </div>
                        <div className={styles.enterprise_area}>
                            <div className={styles.name_logo}>
                                <h2 className={styles.enterprise_name}>{negocio.nome}</h2>
                                <img className={styles.enterprise_image} src={imagemGenerica(negocio.nome)} alt="Logo da empresa" />
                            </div>
                            <div className={styles.informations}>
                                <p className={styles.information_text}>Média de avaliações: <span className={styles.enterprise_data}>{negocio.avaliacao}</span> </p>
                                <p className={styles.information_text}>Serviços totais prestados: <span className={styles.enterprise_data}> MOCKUP (TIRAR DEPOIS TALVEZ) </span> </p>
                                {/* <p className={styles.information_text}> Serviço mais escolhido: <span className={styles.enterprise_data}>Carros esportivos</span></p> */}
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
                                onClick={handleProposta2}
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

export default ProposalConfirmationPage1;