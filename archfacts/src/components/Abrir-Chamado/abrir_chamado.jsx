import React from "react";
import styles from '../Abrir-Chamado/abrir_chamado.module.css'
import adicionar_icon from "../../utils/assets/plus_signal.svg"


const AbrirChamado = ({ onAbrirChamadoClick }) => {
    return (
        <div className={styles.abrir_chamado} onClick={onAbrirChamadoClick}>
            <h1>Abrir Chamado</h1>
            <img src={adicionar_icon}
                alt="icone de adicionar"
                width={60}
                height={60} />
        </div >
    )
}

export default AbrirChamado;