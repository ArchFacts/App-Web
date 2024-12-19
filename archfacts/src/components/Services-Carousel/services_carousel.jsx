import React, { useState, useEffect, useCallback } from "react";
import styles from "./services_carousel.module.css";
import ServiceCard from "../Service-Card/service_card";
import { obterServicosEmpresa, imagemServicoGenerica } from "../../api";
import Spinner from "../Spinner/spinner";

const ServicesCarousel = ({ onSelectionChange, codEmpresa, initialSelectedServices = [] }) => {
    const [services, setServices] = useState([]);
    const [selectedCards, setSelectedCards] = useState(initialSelectedServices); // Estado de seleção agora armazena o objeto completo
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const visibleCards = 4;

    // Função para obter os serviços
    const obterServicos = useCallback(async (codEmpresa) => {
        try {
            setLoading(true);
            const response = await obterServicosEmpresa(codEmpresa);
            if (response && response.data) {
                setServices(response.data);
            } else {
                setServices([]);
            }
        } catch (error) {
            console.log("Não foi possível buscar os serviços dessa empresa", error);
            setServices([]); // Garantir que services seja um array vazio em caso de erro
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (codEmpresa) {
            obterServicos(codEmpresa);
        }
    }, [codEmpresa, obterServicos]);

    // Função de clique nos serviços
    const handleCardClick = (service) => {
        const updatedServices = [...selectedCards];

        const serviceIndex = updatedServices.findIndex((s) => s.idServico === service.idServico);

        if (serviceIndex !== -1) {
            updatedServices.splice(serviceIndex, 1); // Remove o serviço da seleção
        } else {
            updatedServices.push(service); // Adiciona o objeto completo do serviço
        }

        setSelectedCards(updatedServices);  // Atualiza o estado de selecionados
        onSelectionChange(updatedServices); // Passa a seleção para o componente pai
    };

    // Navegação anterior
    const handlePrev = useCallback(() => {
        if (services.length <= visibleCards) return;
        const isFirstCard = currentIndex === 0;
        const newIndex = isFirstCard ? services.length - visibleCards : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, services.length, visibleCards]);

    // Navegação próxima
    const handleNext = useCallback(() => {
        if (services.length <= visibleCards) return;
        const isLastCard = currentIndex >= services.length - visibleCards;
        const newIndex = isLastCard ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, services.length, visibleCards]);

    // Atualiza os serviços exibidos
    const getDisplayedServices = () => {
        const displayedServices = services.slice(currentIndex, currentIndex + visibleCards);
        return displayedServices.map(service => ({
            ...service,
            isSelected: selectedCards.some(selected => selected.idServico === service.idServico) // Verifica se o serviço está selecionado
        }));
    };

    return (
        <div className={styles['main-carousel']}>
            <div className={styles['carousel-container']}>
                <button
                    className={`${styles['carousel-button']} ${styles['prev']}`}
                    onClick={handlePrev}
                    disabled={services.length <= visibleCards}
                >
                    ‹
                </button>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className={styles['cards']}>
                        {services.length === 0 ? (
                            <p className={styles.paragrafo}>Não há serviços disponíveis</p>
                        ) : (
                            getDisplayedServices().map((service) => (
                                <ServiceCard
                                    key={`${service.idServico}`} // Chave única com base no idServico
                                    img={imagemServicoGenerica(service.idServico)}
                                    title={service.nome || "Indisponível"}
                                    text={service.descricao || "Indisponível"}
                                    isSelected={service.isSelected} // Passa o estado de seleção
                                    onClick={() => handleCardClick(service)} // Passa o objeto completo do serviço
                                />
                            ))
                        )}
                    </div>
                )}
                <button
                    className={`${styles['carousel-button']} ${styles['next']}`}
                    onClick={handleNext}
                    disabled={services.length <= visibleCards}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default ServicesCarousel;
