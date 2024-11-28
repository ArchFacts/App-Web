import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../utils/global.css";
import styles from "../Page-1/proposal_confirmation_page1.module.css";
import { useNavigate } from "react-router-dom";
import stylesPage3 from "../Page-3/proposal_confirmation_page3.module.css";
import BotaoProposta from "../../Botao/botao_proposta_3.jsx";
import { useLocation } from "react-router-dom";
import stylesPage4 from './proposal_confirmation_page4.module.css';
import { registroProposta, dadosUsuarioLogado, obterDonoNegocio, cadastrarPropostaServico, imagemServicoGenerica, imagemGenerica } from "../../../api.jsx";
import Spinner from "../../Spinner/spinner.jsx";
import ServiceCard from "../../Service-Card/service_card.jsx";

const ProposalConfirmationPage4 = () => {
    const location = useLocation();
    const { titulo, cep, endereco, numero, complemento, dataEntrega, descricao, negocio } = location.state || {};
    const { selectedServices = [] } = location.state || {};
    // const selectedServices = location.state?.selectedServices || [];
    // console.log("location", selectedServices);
    console.log(location.state);
    const [usuario, setUsuario] = useState(null);
    const [donoNegocio, setDonoNegocio] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        titulo: titulo || "",
        cep: cep || "",
        endereco: endereco || "",
        numero: numero || "",
        complemento: complemento || "",
        dataEntrega: dataEntrega || "",
        descricao: descricao || "",
        negocio: negocio || ""
    });

    useEffect(() => {
        if (location.state) {
            setFormData({
                titulo: titulo || "",
                cep: cep || "",
                endereco: endereco || "",
                numero: numero || "",
                complemento: complemento || "",
                dataEntrega: dataEntrega || "",
                descricao: descricao || "",
                negocio: negocio || ""
            });
        }
    }, [location.state]);

    const dataFormatada = new Date(formData.dataEntrega).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const navigate = useNavigate();

    const handleCadastro = async () => {
        if (!negocio || !negocio.codigo || !negocio.nome) {
            throw new Error("Código de empresa ou nome do negócio não definidos.");
        }

        try {
            await registroProposta(formData, negocio.codigo, negocio.nome);
            console.log(`Proposta cadastrada: ${JSON.stringify(formData)}`);
            toast.success("Proposta cadastrada com sucesso!")
            return true;
        } catch (error) {
            console.log("Houve um erro ao fazer o cadastro", error);
            toast.error("Houve erro ao fazer o cadastro.");
            return false;
        }
    }

    const buscarDadosUsuarioLogado = async () => {
        try {
            const response = await dadosUsuarioLogado();
            setUsuario(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário", error);
        } finally {
            setLoading(false);
        }
    };

    const obterDadosDonoNegocio = async (codEmpresa) => {
        try {
            const response = await obterDonoNegocio(negocio.codigo);
            setDonoNegocio(response.data);
            console.log("dono negocio", response.data);
        } catch (error) {
            console.error("Erro ao buscar o dono do negócio", error);
        }
    }

    const handleCadastrarPropostaServico = async (data) => {
        try {
            const response = await cadastrarPropostaServico(data);
            console.log("DADOS DO SERVIÇO", response.data);
            return true;
        } catch (error) {
            console.error("Não foi possível cadastrar os serviços da proposta", error)
            return false;
        }
    }

    useEffect(() => {
        buscarDadosUsuarioLogado();
        obterDadosDonoNegocio();
    }, []);

    const handleEnviarProposta = async () => {
        const cadastroSucesso = await handleCadastro();

        if (cadastroSucesso) {
            for (const service of selectedServices) {
                const data = {
                    idServico: service.idServico,
                    idRemetente: usuario.email,
                    idDestinatario: negocio.idNegocio
                };
                console.log("usuário", data);
                const sucesso = await handleCadastrarPropostaServico(data);
                if (!sucesso) {
                    toast.error("Erro ao gerenciar o serviço em sua proposta! Tente novamente por favor");
                    return;
                }
            }
        }

        if (cadastroSucesso && cadastrarPropostaServico) {
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
        } else {
            toast.error("Houve um erro com o envio de sua proposta, por favor tente novamente mais tarde!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    }

    const handleVoltar = () => {
        navigate(`/enviar-proposta3/${negocio.codigo}/${negocio.nome}`, { state: { formData, negocio } });
    };

    if (loading) {
        return <Spinner />
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Confirmação dos dados</h1>
                        <div className={stylesPage3.paragrafo}>
                            <p className={styles.text}>
                                Confirme os dados antes de enviar a solicitação para {negocio.nome}
                            </p>
                        </div>
                        <div className={stylesPage4.dados}>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}>Empresa:
                                    <div className={stylesPage4.dado_importado}>{negocio.nome || "Indisponível"}</div>
                                </div>
                                <div className={stylesPage4.informations}>Solicitante:
                                    <div className={stylesPage4.dado_importado}>{usuario.nome || "Indisponível"}</div>
                                </div>
                            </div>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}>E-mail da empresa:
                                    {donoNegocio ? (
                                        <div className={stylesPage4.dado_importado}>{donoNegocio.email || "Indisponível"}</div>
                                    ) : (
                                        <p>Carregando dono do negócio...</p>
                                    )}
                                </div>
                                <div className={stylesPage4.informations}> E-mail do solicitante:
                                    <div className={stylesPage4.dado_importado}>{usuario.email || "Indisponível"}</div>
                                </div>
                            </div>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}>CEP:
                                    <div className={stylesPage4.dado_importado}>{formData.cep || "Indisponível"}</div>
                                </div>
                                <div className={stylesPage4.informations}> Endereço:
                                    <div className={stylesPage4.dado_importado}>{formData.endereco || "Indisponível"}</div>
                                </div>
                            </div>
                            <div className={stylesPage4.datas}>
                                <div className={stylesPage4.informations}> Nº:
                                    <div className={stylesPage4.dado_importado}>{formData.numero || "Indisponível"}</div>
                                </div>
                                <div className={stylesPage4.informations}> Complemento:
                                    <div className={stylesPage4.dado_importado}>{formData.complemento || "Indisponível"}</div>
                                </div>
                            </div>
                            {/* <div className={stylesPage4.datas}> */}
                            <div className={stylesPage4.informations}>
                                Data:
                                <div className={stylesPage4.dado_importado}>{formData.dataEntrega || "Indisponível"}</div>
                            </div>
                            <h3>Serviços escolhidos:</h3>
                            <ul>
                                {selectedServices && selectedServices.length > 0 ? (
                                    selectedServices.map((service, index) => (
                                        <ServiceCard
                                            img={imagemServicoGenerica()}
                                            key={index} // Sempre use um atributo `key` único no React
                                            title={service.nome || "Indisponível"} // Propriedades corretas do objeto
                                            text={service.descricao || "Indisponível"
                                            }
                                        />
                                    ))
                                ) : (
                                    <li>Nenhum serviço encontrado</li>
                                )}
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