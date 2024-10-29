import React from "react";
import styles from "./mediumcarousel.module.css"
import Slider from 'react-slick';

import imagem1 from '../../utils/assets/medium_carousel1.jpg';
import imagem2 from '../../utils/assets/aperto_mao2.jpg';
import imagem3 from '../../utils/assets/medium_carousel2.jpg';

const images = [
    imagem1,
    imagem2,
    imagem3
];

const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000
};

const MediumCarousel = () => {
    return (
        <div className={styles.slider_box}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img className={styles.imagem} src={image} alt={`Imagem ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default MediumCarousel