import styles from './profileData.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { atualizarPerfilBeneficiario } from '../../api';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


const ProfileData = ({ email, telefone, dataRegistro }) => {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
    const [emailValue, setEmailValue] = useState(email);
    const [telefoneValue, setTelefoneValue] = useState(telefone);

    const handleCheckboxChange = () => {
        setIsEditable((prevState) => !prevState);
    };

    useEffect(() => {
        setEmailValue(email);
        setTelefoneValue(telefone);
    }, [email, telefone])

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    };

    const handleTelefoneChange = (e) => {
        setTelefoneValue(e.target.value);
    };

    const validarDados = async () => {
        const schema = Yup.object({
            email: Yup.string()
                .email("Insira um e-mail válido"),
            telefone: Yup.string()
                .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                    "O telefone deve ter 11 ou 12 dígitos"),
        });

        try {
            await schema.validate({ email: emailValue, telefone: telefoneValue })
            return true;
        } catch (error) {
            console.log(error);
            toast.error("Dados inválidos!", { theme: "colored" });
            return false;
        }
    }

    const atualizarDados = async () => {
        const validacao = await validarDados();
        if (!validacao) return;
        try {
            const data = { email: emailValue, telefone: telefoneValue };
            const response = await atualizarPerfilBeneficiario(data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao atualizar os dados do usuário", error);
            return;
        } finally {
            toast.success("Informações atualizadas! Faça o seu login novamente, redirecionando...", { theme: "colored" });
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.divInput}>
                <label>E-mail</label>
                <input
                    value={emailValue}
                    onChange={handleEmailChange}
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.divInput}>
                <label>Telefone</label>
                <input
                    value={telefoneValue}
                    onChange={handleTelefoneChange}
                    className={styles.input}
                    type="text"
                    disabled={!isEditable}
                />
            </div>
            <div className={styles.divInput}>
                <label>Data de registro</label>
                <input
                    value={dataRegistro}
                    className={styles.input}
                    type="string"
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
                onClick={atualizarDados}
            >
                Salvar Alterações
            </button>
        </div>
    );
};

export default ProfileData;
