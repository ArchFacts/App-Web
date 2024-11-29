import React from "react";
import Modal from 'react-modal' // import para criar modais com React
import '../../../utils/global.css';
import styles from '../Prestador/projetos_prestador.module.css'
import SideBarColaborador from "../../../components/Side-Bar-Colaborador/sideBarColaborador";
import ProjectName from "../../../components/Project-Name/project_name";
import ProjetoComponentePrestador from "../../../components/Projeto/Prestador/projeto_componente_prestador";
import { useEffect, useState } from 'react';
import Spinner from "../../../components/Spinner/spinner";
import { dadosUsuarioLogado, buscarProjetosNegocio } from "../../../api";
import { useNavigate } from "react-router-dom";


const ProjetosPrestador = () => {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true)
    const [projetos, setProjetos] = useState([]);
    const navigate = useNavigate();

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

    const buscarProjetos = async (data) => {
        if (!usuario) {
            console.error("Usuário não encontrado");
            return;
        }

        try {
            const response = await buscarProjetosNegocio(usuario.negocio.idNegocio);
            setProjetos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os projetos do negócio", error);
        }
    }

    const handleProjetoClick = (projeto) => {
        console.log("clicou", projeto);
        console.log("ID DO PROJETO", projeto.idProjeto);
        navigate(`/tarefas-prestador/${projeto.idProjeto}`, { state: { idProjeto: projeto.idProjeto } });
    };

    useEffect(() => {
        buscarDadosUsuarioLogado();
    }, []);

    useEffect(() => {
        if (usuario) {
            buscarProjetos();
        }
    }, [usuario]);

    if (loading) {
        return <Spinner />
    }

    return (
        <section className={styles.screen}>
            <SideBarColaborador></SideBarColaborador>
            <div className={styles.content_area}>
                <div className={styles.project_name}>
                    <ProjectName title={usuario.negocio.nome}></ProjectName>
                </div>
                <div className={styles.project_box}>
                    <div className={styles.detail_bar}></div>
                    <div className={styles.content_area}>

                        {projetos.length > 0 ? (
                            projetos.map((projeto, index) => (
                                <ProjetoComponentePrestador
                                    key={projeto.idProjeto}
                                    projectName={`Projeto de ${projeto.nome}` || "Indisponível"}
                                    solicitanteName={projeto.destinatario.nome || "Indisponível"}
                                    data={projeto.dataEntrega}
                                    status={projeto.status}
                                    onClick={() => handleProjetoClick(projeto)}
                                />
                            ))
                        ) : (
                            <p>Não há projetos disponíveis.</p>
                        )}

                        {/* <ProjetoComponentePrestador
                            projectName={'Projeto de abelhas'}
                            solicitanteName={'Júlia Campioto'}>
                        </ProjetoComponentePrestador>

                        <ProjetoComponentePrestador
                            projectName={'Projeto de abelhas'}
                            solicitanteName={'Júlia Campioto'}>
                        </ProjetoComponentePrestador>

                        <ProjetoComponentePrestador
                            projectName={'Projeto de abelhas'}
                            solicitanteName={'Júlia Campioto'}>
                        </ProjetoComponentePrestador> */}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjetosPrestador;