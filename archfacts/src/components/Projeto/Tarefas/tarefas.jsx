import React from "react";
import styles from '../Tarefas/tarefas.module.css'
import task_icon from '../../../utils/assets/task.svg'

const Tarefas = ({onClick}) => {
    return(
        <div className={styles.tarefas} onClick={onClick}>
            <p>Ver tarefas</p>
            <img src={task_icon} alt="" 
            width={40}
            height={40}/>
        </div>
    )
}

export default Tarefas