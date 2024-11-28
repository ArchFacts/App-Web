import styles from './profilePrestador.module.css';
import React, { useState, useEffect } from "react";

const ProfilePrestador = ({ codigoNegocio, email, cpf, cnpj, telefone }) => {
    const [isEditable, setIsEditable] = useState(false);
    

    const [formData, setFormData] = useState({
        codigoNegocio: '',
        email: '',
        cpf: '',
        cnpj: '',
        telefone: ''
    });

    useEffect(() => {
        console.log("teste")
        setFormData({
            codigoNegocio: codigoNegocio || '',
            email: email || '',
            cpf: cpf || '',
            cnpj: cnpj || '',
            telefone: telefone || ''
        });
    }, [codigoNegocio, email, cpf, cnpj, telefone]);

    const handleCheckboxChange = () => {
        setIsEditable((prevState) => !prevState);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    return (
        <div className={styles.card}>
            <div className={styles.divCodigo}>
                <label className={styles.labelCodigo}>CÓDIGO DE NEGÓCIO</label>
                <input
                    name="codigoNegocio"
                    value={formData.codigoNegocio}
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputs}>
                <div className={styles.divInput}>
                    <label>E-mail:</label>
                    <input
                        name="email"
                        value={formData.email}
                        placeholder="Ex: LuisVolks@gmail.com"
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.divInput}>
                    <label>CPF:</label>
                    <input
                        name="cpf"
                        value={formData.cpf}
                        placeholder="Ex: 976.134.045-19"
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className={styles.inputs}>
                <div className={styles.divInput}>
                    <label>CNPJ:</label>
                    <input
                        name="cnpj"
                        value={formData.cnpj}
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.divInput}>
                    <label>Telefone:</label>
                    <input
                        name="telefone"
                        value={formData.telefone}
                        placeholder='Ex: (11) 93263-6321'
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleInputChange}
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