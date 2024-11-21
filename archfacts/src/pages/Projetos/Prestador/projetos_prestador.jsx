import React from "react";
import Modal from 'react-modal' // import para criar modais com React
import '../../../utils/global.css';
import styles from '../Prestador/projetos_prestador.module.css'
import SideBarColaborador from "../../../components/Side-Bar-Colaborador/sideBarColaborador";
import ProjectName from "../../../components/Project-Name/project_name";
import ProjetoComponentePrestador from "../../../components/Projeto/Prestador/projeto_componente_prestador";


const ProjetosPrestador = () => {

    return (
        <section className={styles.screen}>
            <SideBarColaborador></SideBarColaborador>
            <div className={styles.content_area}>
                <div className={styles.project_name}>
                    <ProjectName title=''></ProjectName>
                </div>
                <div className={styles.project_box}>
                    <div className={styles.detail_bar}></div>
                    <div className={styles.content_area}>

                        <ProjetoComponentePrestador
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
                        </ProjetoComponentePrestador>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjetosPrestador;