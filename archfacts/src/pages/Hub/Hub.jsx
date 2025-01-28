import React, { useState, useEffect } from 'react';
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import styles from './Hub.module.css';
import SideBar from '../../components/Side-Bar/sideBar';
import { useNavigate } from 'react-router-dom';
import { buscarEmpresas, imagemGenerica, dadosUsuarioLogado } from '../../api';
import Spinner from '../../components/Spinner/spinner';

const Hub = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [negocios, setNegocios] = useState([]);
    const [usuario, setUsuario] = useState(null);

    const handleClick = (nomeEmpresa) => {
        navigate(`/projetos-beneficiario/${nomeEmpresa}`, { state: { email: usuario.email, nomeEmpresa } });
    };

    const handleBuscarEmpresas = async () => {
        try {
            const response = await buscarEmpresas();
            setNegocios(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Não foi possível buscar as empresas parceiras", error);
        } finally {
            setLoading(false); 
        }
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

    useEffect(() => {
        buscarDadosUsuarioLogado();
    }, []);

    useEffect(() => {
        handleBuscarEmpresas();
    }, []); // Executa apenas na montagem do componente

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <span className={styles.text}>Seja bem-vindo!</span>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.empresasContainer}>
                    <div className={styles.barraSuperior}>
                        <p>Prestadores na plataforma:</p>
                    </div>
                    <div className={styles.cardsEmpresas}>
                        {negocios.length > 0 ? (
                            negocios.map((negocio) => (
                                <EnterpriseCard
                                    key={negocio.idNegocio}
                                    title={negocio.nome || "Indisponível"}
                                    rating={negocio.avaliacao || "Indisponível"}
                                    ticketQuantity={"2"}
                                    img={imagemGenerica(negocio.nome || "Indisponível")}
                                    buttonText={"Meus Projetos"}
                                    onClickEmpresa={() => handleClick(negocio.nome)}
                                />
                            ))
                        ) : (
                            <p className={styles.paragrafo}>Não há empresas parceiras disponíveis</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hub;
