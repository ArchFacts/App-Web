import React from "react";
import styles from "./navhome.module.css";

const NavHome = ({ logo_image, logo_text }) => {
    return (
        <nav className={styles.navbar}>
          
            <div className={styles.logo_area}>
          <a href="#hero">
                <img src={logo_image} className={styles.logo_text} alt="Logo de Início" />
                <img src={logo_text} className={styles.logo_image} alt="Logo de Início" />
            </a>
            </div> 
            <ul className={styles.nav_itens}>
                <li>
                <a href="#problemSection">Problemas resolvidos</a>
                </li>
                <li>
                    <a href="#solutionSection">Por que usar nossa solução?</a>
                </li>
                <li>
                    <a href="#profileSection">Valores</a>
                </li>
                <li>
                    <a href="#contactSection">Contatos</a>
                </li>
                <li>
                <a href="/login">Login</a>                </li>
            </ul>

        </nav>
    );
};

export default NavHome;