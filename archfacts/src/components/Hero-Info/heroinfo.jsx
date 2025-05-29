import React from "react";
import styles from "./heroinfo.module.css";
import { useNavigate } from "react-router-dom";

const HeroInfo = () => {
    const navigate = useNavigate();

    const handleCadastro = () => {
        navigate("/nivel-usuario");
    };

    return (
        <div className={styles.hero_info}>
            <div className={styles.title_div}>
                <p>Eficiência em gestão de negócios</p>
                <p>Ideal para donos de negócios se organizarem, colaborarem e captarem clientes.</p>
            </div>
            <div className={styles.button_area}>
                <button className={styles.button}>Saiba mais</button>
                <button className={styles.button} onClick={handleCadastro}>Cadastre-se</button>
            </div>
        </div>
    );
};

export default HeroInfo;