import React from 'react';
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import styles from './Hub.module.css'
import SideBar from '../../components/Side-Bar/sideBar';
const Hub = () => {
    return (
        <>
            <div className={styles.container}>
                <SideBar/>
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}>Seja bem-vindo!</span>
                        <div className={styles.welcome}>
                        </div>
                    </div>
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
export default Hub;