import React, { useState, useEffect } from 'react';
import styles from "./sideBarColaborador.module.css"
import person from '../../utils/assets/person.png'
import folder from '../../utils/assets/pasta.png'
import house from '../../utils/assets/house.png'
import calendar from '../../utils/assets/calendar.png'
import sign from '../../utils/assets/sign.png';
import { Link } from "react-router-dom";
import { dadosUsuarioLogado } from "../../api";
import Spinner from '../Spinner/spinner';

const SideBarColaborador = ({ redirecionarPerfil, onClickTarefa }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);


    const obterDadosUsuarioLogado = async () => {
        try {
            const response = await dadosUsuarioLogado();
            setUsuario(response.data);
            console.log("negocio usuario idUsuaerio", usuario.negocio)
        } catch (error) {
            console.error("Erro ao buscar o usuário", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        obterDadosUsuarioLogado();
        console.log(usuario)
    }, []);

    if (loading) {
        return <Spinner />
    }

    return (
        <div className={styles.sideBar}>
            <Link to={"/home-prestador"}> <img className={styles.img} style={{ width: '35px', height: '35px' }} src={house} alt="" /></Link>
            <Link to={"/chamados-prestador"}><img className={styles.img} style={{ width: '35px', height: '35px' }} src={folder} alt="" /></Link>
            <Link to={"/eventos"}><img className={styles.img} style={{ width: '35px', height: '35px' }} src={calendar} alt="" /></Link>
            <Link to={"/tarefas-prestador"}> <img className={styles.img} style={{ width: '35px', height: '35px' }} src={clipboard} alt="" /></Link>
            <Link to={`/dashboard/${usuario.negocio.idNegocio}`}><img className={styles.img} style={{ width: '35px', height: '35px' }} src={sign} alt="" /></Link>
            <Link to={"/perfil-prestador"}><img className={styles.img} style={{ width: '35px', height: '35px' }} src={person} alt="" onClick={redirecionarPerfil} /></Link>
        </div>
    )
}
export default SideBarColaborador;