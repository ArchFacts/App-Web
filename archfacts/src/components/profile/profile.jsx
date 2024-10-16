import React from "react";
import styles from "./profile.module.css"
import imagem from "../../utils/assets/pedreiro_teste.png"

const Profile = ({ title, subtitle, benefit1, benefit2, benefit3, benefit4 }) => {
    return (
        <div className={styles.profile}>
            <div className={styles.layer_background}>
                <img src={imagem} alt="" />
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <h2 className={styles.subtitle}>{subtitle}</h2>
                <ul className={styles.benefits_list}>
                    <li className={styles.benefit}>{benefit1}</li>
                    <li className={styles.benefit}>{benefit2}</li>
                    <li className={styles.benefit}>{benefit3}</li>
                    <li className={styles.benefit}>{benefit4}</li>
                </ul>
            </div>
        </div>
    );
}

export default Profile