import React from "react";
import styles from "../Spinner/spinner.module.css"
import logo from "../../utils/assets/logo.svg"

const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.loading}>
                <img src={logo} alt="Logo ArchFacts carregamento" 
                width={500}
                height={500}/>
            </div>
        </div>
    );
}

export default Spinner