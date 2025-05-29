import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../../utils/global.css';
import styles from '../Beneficiario/projetos_beneficiario.module.css'
import SideBar from "../../../components/Side-Bar/sideBar";
import ProjectName from "../../../components/Project-Name/project_name";
import ProjetoComponenteBeneficiario from "../../../components/Projeto/Beneficiario/projeto_componente_beneficiario";
import fechar_icon from "../../../utils/assets/modal-x.svg"
import { useNavigate, useLocation } from 'react-router-dom';
import { buscarProjetosBeneficiario, buscarTodosProjetosUsuario } from '../../../api';
import Spinner from '../../../components/Spinner/spinner';

const ProjetosBeneficiario = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [projetos, setProjetos] = useState([]);
    const location = useLocation();
    const { email } = location.state || {};
    const { nomeEmpresa } = location.state || {};
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    console.log(email);
    console.log("NOME DA EMPRESA", nomeEmpresa);

    const abrirModal = (projetoDaVez) => {
        setProjetoSelecionado(projetoDaVez);
        setModalIsOpen(true);
    }

    const fecharModal = () => {
        setModalIsOpen(false);
        setProjetoSelecionado(null);
    }

    const buscarProjetos = async (email) => {
        try {
            const response = nomeEmpresa ? await buscarProjetosBeneficiario(nomeEmpresa, email) : await buscarTodosProjetosUsuario();
            setProjetos(response.data);
            console.log("projetos", response.data);
        } catch (error) {
            console.error("Erro ao buscar os projetos do negócio", error);
        } finally {
            setLoading(false);
        }
    }

    const handleProjetoClickChamado = (projeto) => {
        console.log("clicou", projeto);
        console.log("ID DO PROJETO", projeto.idProjeto);
        console.log("CLICOU")
        navigate(`/chamados-empresa/${projeto.idProjeto}`, { state: { idProjeto: projeto.idProjeto } });
    }

    useEffect(() => {
        const data = async () => {
            setLoading(true);
            try {
                if (nomeEmpresa && email) {
                    await buscarProjetos(email, nomeEmpresa);
                } else {
                    const response = await buscarTodosProjetosUsuario();
                    setProjetos(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar proejetos", error);
            } finally {
                setLoading(false);
            }
        };
        data();
    }, [nomeEmpresa, email]);

    if (loading) {
        return <Spinner />
    }

    const formatarDataBrasileira = (data) => {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' });
    };

    return (
        <section className={styles.screen}>
            <SideBar></SideBar>
            <div className={styles.content_area}>
                <div className={styles.project_name}>
                    <ProjectName title={nomeEmpresa}></ProjectName>
                </div>
                <div className={styles.project_box}>
                    <div className={styles.detail_bar}></div>
                    <div className={styles.content_area}>
                        {projetos.length > 0 ? (
                            projetos.map((projeto, key) => (
                                <ProjetoComponenteBeneficiario
                                    key={key}
                                    name={projeto.nome || "Indisponível"}
                                    status={projeto.status || "Indisponível"}
                                    dataEntrega={formatarDataBrasileira(projeto.dataEntrega)}
                                    onClickChamados={() => handleProjetoClickChamado(projeto)}
                                />
                            ))
                        ) : (
                            <p> Não há projetos disponíveis.</p>
                        )}
                        {/* <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}
                            onFinalizarClick={abrirModal}>
                        </ProjetoComponenteBeneficiario> */}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar o projeto"
                className={styles.modal}
                overlayClassName={styles.modal_overlay}>

                <div className={styles.modal_header}>
                    <h2>Finalizar projeto</h2>
                    <img src={fechar_icon} alt=""
                        onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <p>Deseja confirmar o encerramento deste projeto?</p>
                    <button className={styles.botao}>Confirmar</button>
                </div>
            </Modal>
        </section>
    );
}

export default ProjetosBeneficiario;