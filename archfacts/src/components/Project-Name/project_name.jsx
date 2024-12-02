import React from "react";
import '../../utils/global.css';
import styles from '../Project-Name/project_name.module.css'

const ProjectName = ({ title }) => {
    return (
        <div className={styles.title_area}>
            <h1 className={styles.generic_project_title}>Projetos</h1>
            <h1 className={styles.project_title}>{title}</h1>
            <div className={styles.line}></div>
        </div>
    );
}

export default ProjectName