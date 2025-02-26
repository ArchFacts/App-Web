import React, { useState, useEffect } from 'react';
import styles from './eventos.module.css'
import Event from '../../components/Events/events'
import Polo from '../../utils/assets/Polo.png'
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/spinner';
import { dadosUsuarioLogado, buscarEventos } from '../../api';
import events from '../../components/Events/events';
const Eventos = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [eventos, setEventos] = useState([]);

    const getStatusStyle = (status) => {
        if (status === 'PENDENTE') return { color: '#F9AE00' };
        if (status === 'ABERTO') return { color: '#00F91D' };
        if (status === 'FECHADO') return { color: '#F90000' };
        if (status === 'PROGRESSO') return { color: '#343C6A' };
        return {};
    };


    const buscarDadosUsuarioLogado = async () => {
        try {
            const response = await dadosUsuarioLogado();
            setUsuario(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário", error);
        } finally {
            setLoading(false);
        }
    };

    const buscarEventosFunc = async () => {
        try {
            const response = await buscarEventos();
            setEventos(response.data);
            console.log("EVENTOS", response.data);
        } catch (error) {
            console.error("Erro ao buscar os eventos", error);
        } finally {
            setLoading(false);
        }
    }

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const calcularTempoRestante = (dataEncerramento) => {
        if (!dataEncerramento) return "Tempo não disponível";

        const agora = new Date();
        const encerramento = new Date(dataEncerramento);

        const diferencaMs = encerramento - agora;

        if (diferencaMs <= 0) return "Encerrado";

        const dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${dias} dias, ${horas} horas e ${minutos} minutos restantes`;
    };

    useEffect(() => {
        buscarDadosUsuarioLogado();
        buscarEventosFunc();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <section>
                <SideBarColaborador />
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}> Eventos</span>
                        <div className={styles.welcome}></div>
                    </div>
                    <div className={styles.card}>
                        {eventos.length > 0 ? (
                            eventos.map((evento) => (
                                <Event
                                    name={`Projeto: ${evento.nomeProjeto || "Indisponível"}`}
                                    tipo={evento.tipo || "Indisponível"}
                                    descricao={evento.descricao || "Indisponível"}
                                    data={formatarData(evento.dataCriacao || "Indisponível")}
                                    encerramento={formatarData(evento.dataEncerramento || "Indisponível")}
                                    previsao={calcularTempoRestante(evento.dataEncerramento)}
                                    status={evento.status || "Indisponível"}
                                    statusColor={getStatusStyle(evento.status).color || "black"}
                                />
                            ))
                        ) : (
                            <p className={styles.paragrafo}>Não há eventos disponíveis.</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Eventos;