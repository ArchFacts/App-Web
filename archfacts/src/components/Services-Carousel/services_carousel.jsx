import React, { useState, useEffect } from "react";
import styles from "./services_carousel.module.css";
import ServiceCard from "../Service-Card/service_card";
import service1 from '../../utils/assets/service1.webp';
import service2 from '../../utils/assets/service2.jpg';
import service3 from '../../utils/assets/service3.jpg';
import service4 from '../../utils/assets/service4.jpg';
import service5 from '../../utils/assets/service5.webp';
import service6 from '../../utils/assets/service6.webp';

const ServicesCarousel = ({ onSelectionChange }) => {
    const cards = [
        { id: 1, img: service1, title: "Carros econômicos", text: "Possui os carros mais econômicos do mercado" },
        { id: 2, img: service2, title: "Carros clássicos", text: "Possui os carros mais memoráveis do mercado" },
        { id: 3, img: service3, title: "Carros estéticos", text: "Possui carros referência em estética do mercado" },
        { id: 4, img: service4, title: "Carros esportivos", text: "Possui carros referência em potência no mercado" },
        { id: 5, img: service5, title: "Carros elétricos", text: "Possui carros com foco em sustentabilidade" },
        { id: 6, img: service6, title: "Carros conversíveis", text: "Possui carros com teto retrátil e estilosos" },
    ];

    const [selectedCards, setSelectedCards] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleCards = 4;

    const handleCardClick = (id) => {
        setSelectedCards((prevSelectedCards) => {
            const updatedSelection = prevSelectedCards.includes(id)
                ? prevSelectedCards.filter(cardId => cardId !== id)
                : [...prevSelectedCards, id];
            return updatedSelection;
        });
    };
    useEffect(() => {
        onSelectionChange(selectedCards);
    }, [selectedCards, onSelectionChange]);

    const handlePrev = () => {
        const isFirstCard = currentIndex === 0;
        const newIndex = isFirstCard ? cards.length - visibleCards : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const isLastCard = currentIndex >= cards.length - visibleCards;
        const newIndex = isLastCard ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className={styles['main-carousel']}>
            <div className={styles['carousel-container']}>
                <button className={`${styles['carousel-button']} ${styles.prev}`} onClick={handlePrev}>
                    ‹
                </button>

                <div className={styles['cards']}>
                    {cards.slice(currentIndex, currentIndex + visibleCards).map((card) => (
                        <ServiceCard
                            key={card.id}
                            img={card.img}
                            title={card.title}
                            text={card.text}
                            isSelected={selectedCards.includes(card.id)}
                            onClick={() => handleCardClick(card.id)} 
                        />
                    ))}
                </div>

                <button className={`${styles['carousel-button']} ${styles.next}`} onClick={handleNext}>
                    ›
                </button>
            </div>
        </div>
    );
};

export default ServicesCarousel;