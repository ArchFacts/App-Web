import React from 'react'
import styles from './homePrestador.module.css'
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import EnterpriseScore from '../../components/Enterprise-Score/enterpriseScore';
import OpenProposal from '../../components/Open-Proposal/openProposal';
const HomePrestador = () => {

    return (
        <>
            <section>
                <SideBarColaborador />
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}> Seja bem vindo!</span>
                        <div className={styles.welcome}></div>
                    </div>
                    <div className={styles.card}>
                    </div>
                    <div className={styles.conteudo}>
                        <EnterpriseScore
                            empresa={"Stefanini"}
                            avaliacao={"4"}
                        />
                        <div className={styles.propostas}>
                            <div className={styles.titulo}>
                                <h1>Propostas abertas</h1>
                            </div>
                            <div className={styles.titulosColunas}>
                                <span><p>Solicitante</p></span>
                                <span><p>Serviço escolhidos</p></span>
                                <span><p>Download</p></span>
                                <span><p>Aceitar Recusar</p></span>
                            </div>
                            <OpenProposal
                                solicitante={"Julia Campioto"}
                                servicos={"Carros estéticos, Carros esportivos"}
                            />
                            <OpenProposal
                                solicitante={"Julia Campioto"}
                                servicos={"Carros estéticos, Carros clássicos, Carros esportivos "}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomePrestador;