import React from 'react'
import styles from './homePrestador.module.css'
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import EnterpriseScore from '../../components/Enterprise-Score/enterpriseScore';
import OpenProposal from '../../components/Open-Proposal/openProposal';
const HomePrestador = () => {

    return (
        <>
            <SideBarColaborador/>  
            <div className={styles.content}>    
                <div className={styles.capsula}>
                    <span className={styles.text}> Seja bem vindo!</span>
                    <div className={styles.welcome}></div>
                </div>
                <div className={styles.card}>
                </div>
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
                        <span>Solicitante</span>
                        <span>Serviço escolhidos</span>
                        <span>Download</span>
                        <span>Aceitar Recusar</span>
                    </div>
                    <OpenProposal
                    solicitante={"Julia Campioto"}
                    servicos={"Manutenção, Vistoriaxjvnasdn fjlsadnfluiasdfilbasdhfbas ihdbfilasdbfuiba sdifbasudbfuabsdfilb"}
                    />
                    <OpenProposal
                    solicitante={"Julia Campioto"}
                    servicos={"Manutenção, Vistoriaxjvnasdn sdfilbsdifbasudbfuabsdfilbsdifbasudbfuabsdfilbsdifbasudbfuabsdfilbsdifbasudbfuabsdfilb"}
                    />
                </div>
            </div>

        </>
    )
}
export default HomePrestador;