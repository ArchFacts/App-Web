import styles from './profilePrestador.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { atualizarPerfilPrestador } from '../../api';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ProfilePrestador = ({ codigoNegocio, email, cpf, cnpj, telefone }) => {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
    const [emailValue, setEmailValue] = useState(email);
    const [telefoneValue, setTelefoneValue] = useState(telefone);
    const [cpfValue, setCpfValue] = useState(cpf);
    const [cnpjValue, setCnpjValue] = useState(cnpj);
    const [codigoNegocioValue, setCodigoNegocioValue] = useState(codigoNegocio);

    useEffect(() => {
        setEmailValue(email);
        setTelefoneValue(telefone);
        setCpfValue(cpf);
        setCnpjValue(cnpj);
        setCodigoNegocioValue(codigoNegocio);
    }, [email, telefone, cpf, cnpj]);

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    };

    const handleTelefoneChange = (e) => {
        setTelefoneValue(e.target.value);
    };

    const handleCpfChange = (e) => {
        setCpfValue(e.target.value);
    };

    const handleCnpjChange = (e) => {
        setCnpjValue(e.target.value);
    };

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



    const validarDados = async () => {
        const schema = Yup.object({
            email: Yup.string()
                .email("Insira um e-mail válido"),
            telefone: Yup.string()
                .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
                    "O telefone deve ter 11 ou 12 dígitos"),
            cpf: Yup.string().nullable()
                .matches(/^\d{11}$/,
                    "O CPF deve ter 11 dígitos")
                .notRequired(),
            cnpj: Yup.string().nullable()
                .matches(/^\d{14}$/,
                    "O CNPJ deve ter 14 dígitos")
                .notRequired(),
        });

        try {
            await schema.validate({ email: emailValue, telefone: telefoneValue, cpf: cpfValue, cnpj: cnpjValue })
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
            const data = { email: emailValue, telefone: telefoneValue, cpf: cpfValue, cnpj: cnpjValue };
            const response = await atualizarPerfilPrestador(data);
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


    const [formData, setFormData] = useState({
        codigoNegocio: '',
        email: '',
        cpf: '',
        cnpj: '',
        telefone: ''
    });

    return (
        <div className={styles.card}>
            <div className={styles.divCodigo}>
                <label className={styles.labelCodigo}>CÓDIGO DE NEGÓCIO</label>
                <input
                    name="codigoNegocio"
                    value={codigoNegocioValue}
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
                        value={emailValue}
                        placeholder="Ex: LuisVolks@gmail.com"
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className={styles.divInput}>
                    <label>CPF:</label>
                    <input
                        name="cpf"
                        value={cpfValue || "Não possui"}
                        placeholder="Ex: 976.134.045-19"
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleCpfChange}
                    />
                </div>
            </div>
            <div className={styles.inputs}>
                <div className={styles.divInput}>
                    <label>CNPJ:</label>
                    <input
                        name="cnpj"
                        value={cnpjValue || "Não possui"}
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleCnpjChange}
                    />
                </div>
                <div className={styles.divInput}>
                    <label>Telefone:</label>
                    <input
                        name="telefone"
                        value={telefoneValue}
                        placeholder='Ex: (11) 93263-6321'
                        className={styles.input}
                        type="text"
                        disabled={!isEditable}
                        onChange={handleTelefoneChange}
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
                onClick={atualizarDados}
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