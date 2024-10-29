import React from 'react';
import styles from './empresasParceiras.module.css'
import EnterpriseCard from '../../components/Enterprise-Card/enterpriseCard';
import logo from '../../utils/assets/logo_af.png'
import ECorp from '../../utils/assets/ECorp.webp'
import MCDonalds from '../../utils/assets/mcdonalds.png'
import Volks from '../../utils/assets/volks.png'
const EmpresasParceiras = () => {

    return (

        <>
            <div className={styles.upperBar}>
                <img className={styles.logo} src={logo} alt="" />
                <h2 className={styles.empresasText} style={{ color: '#033E8C' }}>Empresas parceiras</h2>
            </div>
            <div className={styles.principal}>
                <input type="text" placeholder='Pesquisar...' className={styles.input} />
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
            <div className={styles.lateralDireita}>
                <div className={styles.divInterior}>
                    <div>
                        <h1 style={{ color: '#F95C00' }}>Conheça</h1>
                        <h2 style={{ color: 'white' }}>nossas parcerias.</h2>
                    </div>

                    <div className={styles.button}>Seguir para o meu perfil</div>
                </div>

            </div>

        </>

    )

}
export default EmpresasParceiras;