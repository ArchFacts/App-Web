import React, { useState, useEffect } from "react";
import styles from "./navhome.module.css";

const NavHome = ({ logo_image, logo_text }) => {
    const [scrolling, setScrolling] = useState(false);

    const scroll = () => {
        if (window.scrollY > 150) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll)
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolling ? styles.navbar_solid : ''}`}>
            <div className={styles.logo_area}>
                <img src={logo_image} className={styles.logo_text} alt="Logo de Início" />
                <img src={logo_text} className={styles.logo_image} alt="Logo de Início" />
            </div>
            <ul className={styles.nav_itens}>
                <a href="">Serviços</a>
                <a href="">Quem somos</a>
                <a href="">Valores</a>
                <a href="">Contatos</a>
                <a href="">Login</a>
            </ul>

        </nav>
    );
};

export default NavHome;