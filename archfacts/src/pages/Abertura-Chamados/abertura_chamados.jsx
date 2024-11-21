import React from 'react';
import SideBar from '../../components/Side-Bar/sideBar';
import styles from './abertura_chamados.module.css';

function AberturaChamados() {
    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <span className={styles.text}>Envie seu chamado</span>
                    <div className={styles.welcome}></div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.barraSuperior}>
                        <p>Preencha os campos</p>
                    </div>
                    <form className={styles.form}>
                        <label>Nome do solicitante:</label>
                        <input type="text" placeholder="Insira seu nome" />

                        <label>Título do chamado:</label>
                        <input type="text" placeholder="Insira um breve título" />

                        <label>Prestador a ser direcionado o chamado:</label>
                        <select>
                            <option value="ecorp">Ecorp</option>
                            <option value="McDonald's">McDonald's</option>
                            <option value="Volks">Volks</option>
                        </select>

                        <label>Descrição:</label>
                        <textarea placeholder="Descreva o chamado"></textarea>

                        <div className={styles.botao}>
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AberturaChamados;