import React from "react";
import '../../../utils/global.css';
import styles from '../Beneficiario/projetos_beneficiario.module.css'
import SideBar from "../../../components/Side-Bar/sideBar";
import ProjectName from "../../../components/Project-Name/project_name";
import ProjetoComponenteBeneficiario from "../../../components/Projeto/Beneficiario/projeto_componente_beneficiario";

const ProjetosBeneficiario = () => {
    return (
        <section className={styles.screen}>
            <SideBar></SideBar>
            <div className={styles.content_area}>
                <div className={styles.project_name}>
                    <ProjectName title='ECORP'></ProjectName>
                </div>
                <div className={styles.project_box}>
                    <div className={styles.detail_bar}></div>
                    <div className={styles.content_area}>
                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}></ProjetoComponenteBeneficiario>
                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}></ProjetoComponenteBeneficiario>
                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}></ProjetoComponenteBeneficiario>
                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}></ProjetoComponenteBeneficiario>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjetosBeneficiario;