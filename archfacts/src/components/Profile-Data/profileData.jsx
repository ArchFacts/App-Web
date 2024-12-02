import styles from './profileData.module.css';
import React, { useState } from "react";

const ProfileData = () => {
    const [isEditable, setIsEditable] = useState(false);

    const handleCheckboxChange = () => {
        setIsEditable((prevState) => !prevState);
    };

    return (
        <div className={styles.card}>
            <div className={styles.divInput}>
                <label>E-mail</label>
                <input
                    placeholder="Ex: LuisVolks@gmail.com"
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.divInput}>
                <label>Telefone</label>
                <input
                    placeholder="Ex: 11 99422-9883"
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.divInput}>
                <label>Data de registro</label>
                <input
                    className={styles.input}
                    type="date"
                    disabled={!isEditable}
                />
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
        </div>
    );
};

export default ProfileData;
