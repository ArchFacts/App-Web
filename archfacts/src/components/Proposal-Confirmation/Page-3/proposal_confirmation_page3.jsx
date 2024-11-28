import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../utils/global.css";
import styles from "../Page-1/proposal_confirmation_page1.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import ProposalMessage from "../../Message/proposal_message.jsx";
import stylesPage3 from "../Page-3/proposal_confirmation_page3.module.css";
import InputProposta from "../../Input/Input-Proposta/input_proposta.jsx";
import BotaoProposta from '../../Botao/botao_proposta_3.jsx';
import api, { registroEmpresa, registroProposta } from "../../../api.jsx";

const ProposalConfirmationPage3 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { negocio, selectedServices } = location.state || {};

    const [formData, setFormData] = useState({
        titulo: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        dataEntrega: "",
        descricao: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "cep") {
            buscaCepData(value);
        }
    };

    const buscaCepData = async (cep) => {
        try {
            const cepFiltrado = cep.replace(/\D/g, ''); // Remove caracteres que não são numéricos

            if (cepFiltrado.length === 8) {
                const resposta = await fetch(`https://viacep.com.br/ws/${cepFiltrado}/json/`);
                const data = await resposta.json();

                if (data.erro) {
                    console.log("CEP não encontrado");
                    return;
                }

                setFormData((prevState) => ({
                    ...prevState,
                    endereco: data.logradouro || '',
                }));
            } else {
                console.log("Cep Inválido");
            }
        } catch (error) {
            console.log("Erro ao buscar o CEP", error);
        }
    };

    const handleVoltar = () => {
        console.log("clicou")
        navigate(`/enviar-proposta2/${negocio.codigo}/${negocio.nome}`, { state: { formData, negocio, selectedServices } });
    };

    const handleContinuar = () => {
        const selectedServices = location.state?.selectedServices || [];
        console.log("selectedServices:", selectedServices);
        if (validateForm()) {
            navigate(`/enviar-proposta4/${negocio.codigo}/${negocio.nome}`, {
                state: {
                    ...formData,
                    selectedServices: selectedServices,
                    negocio: negocio // Inclua o negocio também
                }
            });
        }
    };


    const validateForm = () => {
        const { titulo, cep, endereco, numero, dataEntrega, descricao } = formData;

        if (!titulo) {
            toast.error("O campo 'Título' é obrigatório!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        if (!cep) {
            toast.error("O campo 'CEP' é obrigatório!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        const cepRegex = /^[0-9]{8}$/;
        if (!cepRegex.test(cep)) {
            toast.error("O CEP informado é inválido!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        if (!endereco) {
            toast.error("O campo 'Endereço' é obrigatório!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        if (!numero) {
            toast.error("O campo 'Número' é obrigatório!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        if (!dataEntrega) {
            toast.error("O campo 'Data' é obrigatório!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        const today = new Date();
        const selectedDate = new Date(dataEntrega);
        if (selectedDate <= today) {
            toast.error("A data deve ser posterior à data de hoje!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        if (!descricao) {
            toast.error("O campo 'Descrição' é obrigatório!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return false;
        }

        return true;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Formulário de Proposta para {negocio.nome}</h1>
                        <div className={stylesPage3.paragrafo}>
                            <p className={styles.text}>
                                Preencha os dados para que sua proposta seja analisada com agilidade
                            </p>
                        </div>
                        <div className={stylesPage3.enterprise_area}>
                            <div className={stylesPage3.inputs3}>
                                <InputProposta
                                    label={"Título:"}
                                    type={"text"}
                                    name={"titulo"}
                                    value={formData.titulo}
                                    onChange={handleChange}
                                />
                                <InputProposta
                                    label={"CEP:"}
                                    type={"text"}
                                    name={"cep"}
                                    value={formData.cep}
                                    onChange={handleChange}
                                />
                                <InputProposta
                                    label={"Endereço:"}
                                    type={"text"}
                                    name={"endereco"}
                                    value={formData.endereco}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={stylesPage3.inputs3}>
                                <InputProposta
                                    label={"Número:"}
                                    type={"number"}
                                    name={"numero"}
                                    value={formData.numero}
                                    onChange={handleChange}
                                />
                                <InputProposta
                                    label={"Complemento:"}
                                    type={"text"}
                                    name={"complemento"}
                                    value={formData.complemento}
                                    onChange={handleChange}
                                />
                                <div className={stylesPage3.label_input}>
                                    <label htmlFor="data">Data:</label>
                                    <input
                                        className={stylesPage3.inputDate}
                                        type="date"
                                        name="dataEntrega"
                                        value={formData.dataEntrega}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <ProposalMessage
                            label={"Descrição:"}
                            type={"text"}
                            name={"descricao"}
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                        <div className={styles.buttons}>
                            <BotaoProposta
                                texto="Voltar"
                                onClick={handleVoltar}
                                cor="#F95C00"
                            />
                            <BotaoProposta
                                texto="Continuar"
                                onClick={handleContinuar}
                                cor=" #033E8C"
                            />
                        </div>
                        <div className={styles.progress_bar}>
                            <div className={styles.all_bar}>
                                <div className={styles.progress_individual2}></div>
                                <div className={styles.progress_individual2}></div>
                                <div className={styles.progress_individual1}></div>
                                <div className={styles.progress_individual2}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ProposalConfirmationPage3;