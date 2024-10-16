import React from "react";
import styles from "./heroinfo.module.css"

const HeroInfo = () => {
    return (
        <div className={styles.hero_info}>
            <div className={styles.title_div}>
                <p>ArchFacts / Gestão de negócios</p>
                <p>N° 1 EM EFICIÊNCIA E GESTÃO DE NEGÓCIOS</p>
                <p>Ideal para donos de negócios se organizarem, colaborarem e captarem clientes.</p>
            </div>
            <div className={styles.button_area}>
                <button>Saiba mais</button>
                <button>Cadastre-se</button>
            </div>
        </div>
    );
};

export default HeroInfo;