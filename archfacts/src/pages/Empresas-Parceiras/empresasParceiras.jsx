import React from 'react';
import styles from './empresasParceiras.module.css'
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import logo from '../../utils/assets/logo_af.png'

const EmpresasParceiras = () => {

    return (

        <>
            <div className={styles.upperBar}>
                <img className={styles.logo} src={logo} alt="" />
                <h2 className={styles.empresasText} style={{color: '#033E8C'}}>Empresas parceiras</h2>
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