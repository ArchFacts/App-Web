import React from "react";
import styles from '../Abrir-Chamado/abrir_chamado.module.css';
import adicionar_icon from "../../utils/assets/plus_signal.svg";

const AbrirChamado = ({ onAbrirChamadoClick, h1 }) => {
    return (
        <div className={styles.abrir_chamado} onClick={onAbrirChamadoClick}>
            <h1>{h1}</h1> 
            <img src={adicionar_icon}
                alt="icone de adicionar"
                width={60}
                height={50} />
        </div>
    );
}

export default AbrirChamado;