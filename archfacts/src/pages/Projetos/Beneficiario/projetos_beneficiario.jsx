import React from "react";
import '../../../utils/global.css';
import styles from '../Beneficiario/projetos_beneficiario.module.css'
import SideBar from "../../../components/Side-Bar/sideBar";
import ProjectName from "../../../components/Project-Name/project_name";

const ProjetosBeneficiario = () => {
    return (
        <section className={styles.screen}>
            <SideBar></SideBar>
            <div className={styles.project_name}>
                <ProjectName title='ECORP'></ProjectName>
            </div>
            <div className={styles.project_box}> </div>
        </section>
    );
}

export default ProjetosBeneficiario;