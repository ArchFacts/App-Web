import React, { useState } from 'react';
import styles from './bigcarousel.module.css'
import Slider from 'react-slick';
import imagem1 from '../../utils/assets/aperto_mao.jpg'
import imagem2 from '../../utils/assets/aperto_mao.jpg'
import imagem3 from '../../utils/assets/aperto_mao.jpg'
import imagem4 from '../../utils/assets/aperto_mao.jpg'

const images = [
    imagem1,
    imagem2,
    imagem3,
    imagem4
];

const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
};


const BigCarousel = () => {
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

export default BigCarousel;