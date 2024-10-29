import React from 'react';
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import styles from './EmpresasParceiras.module.css'


const EmpresasParceiras = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sideBar}>

                </div>
                <div className={styles.content}>
                    <div className={styles.empresasContainer}>
                        <div className={styles.barraSuperior}>
                            <p>Prestadores contratados:</p>
                        </div>
                        <div className={styles.cardsEmpresas}>
                            <EnterpriseCard />
                            <EnterpriseCard />
                            <EnterpriseCard />
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}
export default EmpresasParceiras;