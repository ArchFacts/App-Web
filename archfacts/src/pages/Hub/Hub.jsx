import React from 'react';
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import styles from './Hub.module.css'
import SideBar from '../../components/Side-Bar/sideBar';
import ECorp from '../../utils/assets/ECorp.webp'
import MCDonalds from '../../utils/assets/mcdonalds.png'
import Volks from '../../utils/assets/volks.png'
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
                        <EnterpriseCard
                title={"Ecorp"} 
                rating={"3.5/5"}
                ticketQuantity={"5"}
                img={ECorp}
                buttonText={"Saber mais"}/>
                <EnterpriseCard 
                title={"MC Donalds"} 
                rating={"4.1/5"}
                ticketQuantity={"10"}
                img={MCDonalds}
                buttonText={"Saber mais"}/>

                <EnterpriseCard 
                title={"VolksWagen"} 
                rating={"3.7/5"}
                ticketQuantity={"7"}
                img={Volks}
                buttonText={"Saber mais"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Hub;