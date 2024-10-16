import React, { useState, useEffect } from "react";
import styles from "./navhome.module.css";
import { Link } from 'react-scroll'

const NavHome = ({ logo_image, logo_text }) => {

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo_area}>
                <img src={logo_image} className={styles.logo_text} alt="Logo de Início" />
                <img src={logo_text} className={styles.logo_image} alt="Logo de Início" />
            </div>
            <ul className={styles.nav_itens}>
                <li>
                    <Link to="problemSection">Problemas resolvidos</Link>
                </li>
                <li>
                    <a>Por quê usar nossa solução?</a>
                </li>
                <li>
                    <a>Valores</a>
                </li>
                <li>
                    <a>Contatos</a>
                </li>
                <li>
                    <a>Login</a>
                </li>
            </ul>

        </nav>
    );
};

export default NavHome;