import React from 'react';
import styles from './empresasParceiras.module.css'
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import Input from '../../components/Input/Input-Usuario/input.jsx';

const EmpresasParceiras = () => {

    return (

        <>
            <div className={styles.upperBar}>

            </div>
            <div className={styles.principal}>
                <input type="text" placeholder='Pesquisar...' className={styles.input} />
                <EnterpriseCard />
                <EnterpriseCard />
                <EnterpriseCard />

            </div>
            <div className={styles.lateralDireita}>
            </div>

        </>

    )

}
export default EmpresasParceiras;