import React, { useState } from 'react';
import '../../../utils/global.css';
import styles from '../Page-1/proposal_confirmation_page1.module.css';
import BotaoLaranja from "../../Botao/botao_laranja_proposta.jsx";
import { useNavigate } from "react-router-dom";
import Input from "../../Input/Input-Usuario/input.jsx";
import ProposalMessage from "../../Message/proposal_message.jsx";
import stylesPage3 from '../Page-3/proposal_confirmation_page3.module.css'

const ProposalConfirmationPage3 = () => {

    const navigate = useNavigate();

    const handleProposta = () => {
        navigate('/enviar-proposta2');
    };

    const handleProposta4 = () => {
        navigate('/enviar-proposta1');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [formData, setFormData] = useState({
        titulo: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        data: '',
        descricao: ''
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container_proposta}>
                    <div className={styles.container_itens}>
                        <h1>Preencha o fomulário para a Volkswagen</h1>
                        <div className={styles.paragrafo}>
                            <p className={styles.text}>O formulário irá criar uma proposta para o prestador de serviço</p>
                            <p className={styles.text}> Com os dados ele pode tratar da sua demanda da melhor maneira possível.</p>
                        </div>
                        <div className={stylesPage3.enterprise_area}>
                            <div className={stylesPage3.inputs3}>
                                <Input
                                    label={"Título:"}
                                    type={"text"}
                                    name={"titulo"}
                                    value={formData.titulo}
                                    onChange={handleChange}
                                />
                                <Input
                                    label={"CEP:"}
                                    type={"text"}
                                    name={"cep"}
                                    value={formData.cep}
                                    onChange={handleChange}
                                /> <Input
                                    label={"Endereço:"}
                                    type={"text"}
                                    name={"endereco"}
                                    value={formData.endereco}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={stylesPage3.inputs3}>
                                <Input
                                    label={"Número:"}
                                    type={"text"}
                                    name={"numero"}
                                    value={formData.numero}
                                    onChange={handleChange}
                                /> <Input
                                    label={"Complemento:"}
                                    type={"text"}
                                    name={"complemento"}
                                    value={formData.complemento}
                                    onChange={handleChange}
                                /> <Input
                                    label={"Data:"}
                                    type={"date"}
                                    name={"data"}
                                    value={formData.data}
                                    onChange={handleChange}
                                /> </div>
                        </div>
                        {/* <div className={stylesPage3.message}> */}
                            <ProposalMessage label={"Descrição:"}
                                type={"text"}
                                name={"descricao"}
                                value={formData.descricao}
                                onChange={handleChange} />
                        {/* </div> */}
                        <div className={styles.buttons}>
                            <BotaoLaranja
                                texto="Voltar"
                                onClick={handleProposta}
                                cor="#F95C00"
                            />
                            <BotaoLaranja
                                texto="Continuar"
                                onClick={handleProposta4}
                                cor=" #033E8C"
                            /></div>
                        <div className={styles.progress_bar}>
                            <div className={styles.all_bar}>
                                <div className={styles.progress_individual2}>

                                </div>

                                <div className={styles.progress_individual2}>

                                </div>
                                <div className={styles.progress_individual1}>

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

export default ProposalConfirmationPage3;