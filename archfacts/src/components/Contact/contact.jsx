import React, { useState } from "react";
import styles from './contact.module.css'
import InputHome from "../Input/Input-Home/inputhome";
import Message from "../Message/message";
import MediumCarousel from "../Medium-Carousel/mediumcarousel";

const Contact = () => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const [formData, setFormData] = useState({
        email: '',
        nome: '',
        telefone: '',
        mensagem: ''
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
                    <div className={styles.button_area}>
                        <button className={styles.button}>Enviar</button>
                    </div>
                </div>
            </div>
            <div className={styles.slider_div}>
                <MediumCarousel></MediumCarousel>
            </div>
        </div>
    )
}

export default Contact