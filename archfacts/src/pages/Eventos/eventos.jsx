import React from 'react'
import styles from './eventos.module.css'
import Event from '../../components/Events/events'
import Polo from '../../utils/assets/Polo.png'
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
const Eventos = () => {

    return (

        <>
        
            <SideBarColaborador/>
            <div className={styles.content}>    
                <div className={styles.capsula}>
                    <span className={styles.text}> Eventos</span>
                    <div className={styles.welcome}></div>
                </div>
                <div className={styles.card}>
                    <Event
                    name={"Giovane"}
                    tipo={"Projeto"}
                    descricao={"Limpeza com produtos especiais"}
                    data={"18/10"}
                    encerramento={"23/10"}
                    dia={"3"}
                    horas={"5"}
                    minutos={"33"}
                    status={"aberta"}
                    />
                    <Event
                    name={"Giovane"}
                    tipo={"Projeto"}
                    descricao={"Limpeza com produtos especiais"}
                    data={"18/10"}
                    encerramento={"23/10"}
                    dia={"3"}
                    horas={"5"}
                    minutos={"33"}
                    status={"aberta"}
                    />
                    <Event
                    name={"Giovane"}
                    tipo={"Projeto"}
                    descricao={"Limpeza com produtos especiais"}
                    data={"18/10"}
                    encerramento={"23/10"}
                    dia={"3"}
                    horas={"5"}
                    minutos={"33"}
                    status={"aberta"}
                    />
                    <Event
                    name={"Giovane"}
                    tipo={"Projeto"}
                    descricao={"Limpeza com produtos especiais"}
                    data={"18/10"}
                    encerramento={"23/10"}
                    dia={"3"}
                    horas={"5"}
                    minutos={"33"}
                    status={"aberta"}
                    />
                    <Event
                    name={"Giovane"}
                    tipo={"Projeto"}
                    descricao={"Limpeza com produtos especiais"}
                    data={"18/10"}
                    encerramento={"23/10"}
                    dia={"3"}
                    horas={"5"}
                    minutos={"33"}
                    status={"aberta"}
                    />

                </div>
            </div>
        
        </>

    )

}
export default Eventos;