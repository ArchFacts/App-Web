import React, { useState, useEffect } from 'react';
import styles from './empresasParceiras.module.css'
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import logo from '../../utils/assets/logo_af.png'
import ECorp from '../../utils/assets/ECorp.webp'
import MCDonalds from '../../utils/assets/mcdonalds.png'
import Volks from '../../utils/assets/volks.png'
import Spinner from '../../components/Spinner/spinner';
import { imagemGenerica } from '../../api';
import api from '../../api';
import { Navigate, useNavigate } from 'react-router-dom';
import SideBar from '../../components/Side-Bar/sideBar';

const EmpresasParceiras = () => {

    const [loading, setLoading] = useState(true)
    const [negocios, setNegocios] = useState([]);
    const navigate = useNavigate();


    const buscarEmpresasParceiras = async () => {
        try {
            const response = await api.get('/negocios');
            setNegocios(response.data);

        } catch (error) {
            console.error("Não foi possível buscar as empresas parceiras", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCardClick = (index) => {
        const negocioEscolhido = negocios[index];
        console.log(`navegando para a pág da empresa ${negocioEscolhido.nome}`);
        navigate(`/enviar-proposta1/${negocioEscolhido.codigo}/${negocioEscolhido.nome}`, { state: { negocio: negocioEscolhido } });
    }

    useEffect(() => {
        buscarEmpresasParceiras();
        console.log("negocios" + negocios);
    }, []);


    return (
        <>
         <div className={styles.container}>
        <SideBar/>
        <div className={styles.main_content}>
            <div className={styles.upperBar}>
                <img className={styles.logo} src={logo} alt="" />
                <h2 className={styles.empresasText} style={{ color: '#033E8C', fontSize: '2rem' }}>Empresas parceiras</h2>
            </div>
            <div className={styles.principal}>
                <input type="text" placeholder='Pesquisar...' className={styles.input} />

                {loading ? (
                    <Spinner />
                ) : (
                    negocios.length > 0 ? (
                        negocios.map((negocio, index) => (
                            <EnterpriseCard
                                key={negocio.idNegocio}
                                title={negocio.nome}
                                rating={negocio.avaliacao}
                                ticketQuantity={"7"}
                                img={imagemGenerica(negocio.nome)}
                                buttonText={"Saber mais"}
                                onClickEmpresa={() => handleCardClick(index)}
                            />
                        ))
                    ) : (
                        <p>Não há empresas parceiras disponíveis</p>
                    )
                )}
            </div>
            </div>
            <div className={styles.lateralDireita}>
                <div className={styles.divInterior}>
                    <div>
                        <h1 style={{ color: '#F95C00', fontSize: '3rem' }}>Conheça</h1>
                        <h2 style={{ color: 'white', fontSize: '2rem' }}>nossas parcerias.</h2>
                    </div>
                </div>

            </div>
            </div>
        </>

    )

}
export default EmpresasParceiras;