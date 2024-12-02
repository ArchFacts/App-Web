import React from "react";
import styles from "../Chamados/chamados.module.css"
import cliente_icon from "../../../utils/assets/cliente.svg"

const Chamados = ({ onClickChamados }) => {
    return (
        <div className={styles.chamados} onClick={() => {
            console.log("Click dos chamados");
            onClickChamados();
        }}>
            <p>Ver chamados</p>
            <img src={cliente_icon} alt="icone de pessoa"
                width={40}
                height={40} />
        </div>
    );
}

export default Chamados;