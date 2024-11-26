import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../utils/global.css";
import styles from "../Page-1/proposal_confirmation_page1.module.css";
import { useNavigate } from "react-router-dom";
import stylesPage3 from "../Page-3/proposal_confirmation_page3.module.css";
import BotaoProposta from "../../Botao/botao_proposta_3.jsx";
import { useLocation } from "react-router-dom";
import stylesPage4 from './proposal_confirmation_page4.module.css';

const ProposalConfirmationPage4 = () => {
    const location = useLocation();
    const { titulo, cep, endereco, numero, complemento, data, descricao } = location.state || {};
    const navigate = useNavigate();
    const selectedServices = location.state?.selectedServices || [];


    const handleEnviarProposta = () => {
        toast.success("Proposta enviada! Redirecionando...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });

        setTimeout(() => {
            navigate("/empresas-parceiras");
        }, 3000);
    };

    const handleVoltar = () => {
        navigate("/enviar-proposta3");
    };

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Confirmação dos dados</h1>
                        <div className={stylesPage3.paragrafo}>
                            <p className={styles.text}>
                                Confirme os dados antes de enviar a solicitação para Volkswagen
                            </p>
                        </div>
                        <div className={stylesPage4.dados}>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}>Empresa:
                                    <div className={stylesPage4.dado_importado}>Teste</div>
                                </div>
                                <div className={stylesPage4.informations}>Solicitante:
                                    <div className={stylesPage4.dado_importado}>Teste</div>
                                </div>
                            </div>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}>E-mail da empresa:
                                    <div className={stylesPage4.dado_importado}>Teste</div>
                                </div>
                                <div className={stylesPage4.informations}> E-mail do solicitante:
                                    <div className={stylesPage4.dado_importado}>Teste</div>
                                </div>
                            </div>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}>CEP:
                                    <div className={stylesPage4.dado_importado}>{cep}</div>
                                </div>
                                <div className={stylesPage4.informations}> Endereço:
                                    <div className={stylesPage4.dado_importado}>{endereco}</div>
                                </div>
                            </div>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}> Nº:
                                    <div className={stylesPage4.dado_importado}>{numero}</div>
                                </div>
                                <div className={stylesPage4.informations}> Complemento:
                                    <div className={stylesPage4.dado_importado}>{complemento}</div>
                                </div>
                            </div>
                            {/* <div className={stylesPage4.datas}> */}
                            <div className={stylesPage4.informations}>
                                Data:
                                <div className={stylesPage4.dado_importado}>{dataFormatada}</div>
                            </div>
                            {/* </div> */}
                            <h3>Serviços escolhidos:</h3>
                            <ul>
                                {selectedServices.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.buttons}>
                            <BotaoProposta
                                texto="Voltar"
                                onClick={handleVoltar}
                                cor="#F95C00"
                            />
                            <BotaoProposta
                                texto="Enviar Proposta"
                                onClick={handleEnviarProposta}
                                cor="#033E8C"
                            />
                        </div>
                        <div className={styles.progress_bar}>
                            <div className={styles.all_bar}>
                                <div className={styles.progress_individual2}></div>
                                <div className={styles.progress_individual2}></div>
                                <div className={styles.progress_individual2}></div>
                                <div className={styles.progress_individual1}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ProposalConfirmationPage4;