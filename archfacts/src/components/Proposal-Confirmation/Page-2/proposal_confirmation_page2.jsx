import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../utils/global.css";
import styles from "../Page-1/proposal_confirmation_page1.module.css";
import BotaoLaranja from "../../Botao/botao_laranja_proposta.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ServicesCarousel from "../../Services-Carousel/services_carousel.jsx";

const ProposalConfirmationPage2 = ({ empresaSelecionada }) => {
    const [error, setError] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { negocio } = location.state || {};

    // Atualiza a seleção de serviços com base no estado recebido
    useEffect(() => {
        if (location.state && location.state.selectedServices) {
            setSelectedServices(location.state.selectedServices);
        }
    }, [location.state?.selectedServices]);

    // Função para atualizar a seleção de serviços
    const updateSelectedServices = (newServices) => {
        setSelectedServices(newServices);  // Agora, essa função é chamada apenas após o render
    };

    // Função de navegação para a próxima página
    const handleProposta1 = () => {
        navigate(`/enviar-proposta1/${negocio.codigo}/${negocio.nome}`, { state: { negocio } });
    };

    const handleProposta3 = () => {
        if (selectedServices.length === 0) {
            toast.error("Selecione ao menos um serviço antes de prosseguir!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } else {
            navigate(`/enviar-proposta3/${negocio.codigo}/${negocio.nome}`, { state: { selectedServices, negocio } });
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.container_proposta}>
                <div className={styles.container_itens}>
                    <h1>Selecione os serviços da empresa: {negocio.nome}</h1>
                    <div className={styles.paragrafo}>
                        <p className={styles.text}>
                            Escolha os serviços de sua necessidade para prosseguir com a sua proposta
                        </p>
                    </div>

                    <div className={styles.enterprise_area}>
                        {/* Passando a função que vai atualizar o estado de serviços */}
                        <ServicesCarousel onSelectionChange={updateSelectedServices} codEmpresa={negocio.codigo} />
                    </div>

                    <div className={styles.buttons}>
                        <BotaoLaranja
                            texto="Voltar"
                            onClick={handleProposta1}
                            cor="#F95C00"
                        />
                        <BotaoLaranja
                            texto="Continuar"
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
            <ToastContainer />
        </section>
    );
};

export default ProposalConfirmationPage2;