import styles from './profilePrestador.module.css';
import React, { useState } from "react";

const ProfilePrestador = () => {
    const [isEditable, setIsEditable] = useState(false);

    const handleCheckboxChange = () => {
        setIsEditable((prevState) => !prevState);
    };

    return (
        <div className={styles.card}>
               <div className={styles.divCodigo}>
                <label className={styles.labelCodigo}>CÓDIGO DE NEGÓCIO</label>
                <input
                    placeholder="Ex: 550e8400-e29b-41d4-a716-446655440000"
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.inputs}>
            <div className={styles.divInput}>
                <label>E-mail:</label>
                <input
                    placeholder="Ex: LuisVolks@gmail.com"
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.divInput}>
                <label>CPF:</label>
                <input
                    placeholder="Ex: 976.134.045-19"
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            </div>
            <div className={styles.inputs}>
            <div className={styles.divInput}>
                <label>CNPJ:</label>
                <input
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.divInput}>
                <label>Telefone:</label>
                <input
                placeholder='Ex: (11) 93263-6321'
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            </div>
            <div className={styles.checkbox}>
                <input
                    className={styles.inputCheck}
                    type="checkbox"
                    checked={isEditable}
                    onChange={handleCheckboxChange}
                />
                <p className={styles.permitir}>Permitir edição</p>
            </div>

            <button
                className={styles.botao}
                disabled={!isEditable}
            >
                Salvar Alterações
            </button>

            <button className={styles.botaoEditar}> 
            Editar Para Cliente
            </button>
        </div>
    );
};

export default ProfilePrestador;