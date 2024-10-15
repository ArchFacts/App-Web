import React, { useState } from "react";
import styles from './contact.module.css'
import InputHome from "../Input/Input-Home/inputhome";
import Message from "../Message/message";
import MediumCarousel from "../Medium-Carousel/mediumcarousel";
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        nome: '',
        telefone: ''
    });

    return (
        <div className={styles.contact_div}>
            <div className={styles.all_inputs}>
                <div className={styles.contact_area}>
                    <InputHome label="E-mail:"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}>
                    </InputHome>

                    <InputHome label="Nome:"
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}>
                    </InputHome>

                    <InputHome label="Telefone:"
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}>
                    </InputHome>

                    <Message label="Mensagem:"
                        type="text"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}>
                    </Message>
                </div>
            </div>
            <div className={styles.slider_div}>
                <MediumCarousel></MediumCarousel>
            </div>
        </div>
    )
}

export default Contact