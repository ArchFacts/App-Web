import React from 'react'
import styles from './Aaa.module.css'
import Modal from '../../components/Modal-Servico/modal_servico'
import Polo from '../../utils/assets/Polo.png'
const Teste = () => {

    return (

        <>
     <Modal
     Titulo={"Carros econômicos"}
     Text={"A Volkswagen oferece uma linha de veículos econômicos que combinam tecnologia, eficiência e sustentabilidade. Com motores modernos e baixo consumo de combustível, os carros econômicos da Volkswagen são ideais para quem busca economia sem abrir mão do desempenho. Além disso, a montadora investe em soluções para reduzir as emissões de CO₂, contribuindo para um futuro mais verde. Descubra como você pode dirigir com mais economia e responsabilidade."}
     Img={Polo}
     ButtonText={"Fechar"}/>
        </>

    )

}
export default Teste;