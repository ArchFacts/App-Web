import React, { useState, useEffect } from "react";
import styles from '../Dashboard-Apresentacao/dashboard.module.css';
import { useUser } from "../../userContext";
import { buscarResumoFinanceiroDashboard, buscarTarefaMaiorDespesa, buscarChamadoMaiorLucro } from "../../api";
import { useLocation } from 'react-router-dom';
import Spinner from "../../components/Spinner/spinner";
import { toast } from "react-toastify";
import GraficoFinanceiroSemanal from "../../components/Grafico-Barra/barra";
import SideBarColaborador from "../../components/Side-Bar-Colaborador/sideBarColaborador";
import GraficoReceitaHora from "../../components/Grafico-Receita/receita";

const DashApresentacao = () => {
    const { usuario, loading } = useUser();
    const location = useLocation();
    const { idProjeto } = location.state || {};

    const [dadosDashboard, setDadosDashboard] = useState(null);
    const [dadosDespesaKpi, setDadosDespesaKpi] = useState(null);
    const [dadosLucroKpi, setDadosLucroKpi] = useState(null);

    useEffect(() => {
        if (!loading && usuario && idProjeto) {
            const buscarDadosDash = async () => {
                try {
                    const response = await buscarResumoFinanceiroDashboard(idProjeto);
                    setDadosDashboard(response.data);

                    const responseKpi = await buscarTarefaMaiorDespesa(idProjeto);
                    setDadosDespesaKpi(responseKpi.data);

                    const responseKpiLucro = await buscarChamadoMaiorLucro(idProjeto);
                    setDadosLucroKpi(responseKpiLucro.data);
                } catch (error) {
                    toast.error("Erro ao buscar dados da dashboard");
                    console.error("Houve erro ao buscar os dados da dashboard!", error);
                }
            };
            buscarDadosDash();
        }
    }, [loading, usuario, idProjeto]);

    if (!dadosDashboard) {
        return <Spinner />;
    }

    return (
        <section>
            <SideBarColaborador />
            <div className={styles.content}>
                <div className={styles.kpi_area}>
                    <div className={styles.kpi}>
                        <h3>Título da tarefa: <br />{dadosDespesaKpi ? dadosDespesaKpi.titulo : "Indisponível"}</h3>
                        <h3>Tarefa mais cara: <br />R$ {dadosDespesaKpi ? dadosDespesaKpi.despesa : "Indisponível"}</h3>
                        <h3>Status da tarefa: <br />{dadosDespesaKpi ? dadosDespesaKpi.status : "Indisponível"}</h3>
                    </div>
                    <div className={styles.kpi}>
                        <h3>Título do chamado: <br />{dadosLucroKpi ? dadosLucroKpi.titulo : "Indisponível"}</h3>
                        <h3>Maior lucro de chamado: <br />R$ {dadosLucroKpi ? dadosLucroKpi.lucro : "Indisponível"}</h3>
                        <h3>Status do chamado: <br />{dadosLucroKpi ? dadosLucroKpi.status : "Indisponível"}</h3>
                    </div>
                </div>
                <div className={styles.dash_area}>
                    <div className={styles.grafico_receita}>
                        <GraficoReceitaHora dadosDashboard={dadosDashboard} />
                    </div>
                    <div className={styles.grafico_financeiro}>
                        <GraficoFinanceiroSemanal dadosDashboard={dadosDashboard} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashApresentacao;