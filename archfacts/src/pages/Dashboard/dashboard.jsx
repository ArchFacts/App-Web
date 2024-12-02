import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';
import styles from './dashboard.module.css';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import GastosGeraisChart from '../../components/GastosGeraisChart/GastosGeraisChart';
import GastosChart from '../../components/GastosChart/GastosChart';
import RelatorioGastosChart from '../../components/RelatorioGastosChart/RelatorioGastosChart';
import Kpi from '../../components/KpiFinanceiro/KpiFinanceiro';
import Legend from '../../components/GastosLegend/GastosLegend';  
import ChartServicosFinalizadosEmpresa from "../../components/ChartServicosFinalizadosEmpresa/ChartServicosFinalizadosEmpresa";
import FinalizadosEmpresaLegend from "../../components/FinalizadosEmpresaLegend/FinalizadosEmpresaLegend";
import MonthSelector from "../../components/MonthSelector/MonthSelector";
import ChartServicosFinalizadosSemana from "../../components/ChartServicosFinalizadosSemana/ChartServicosFinalizadosSemana";
import WeekChartLegend from "../../components/WeekChartLegend/WeekChartLegend";
import WeekSelectorChart from "../../components/WeekSelectorChart/WeekSelectorChart";

const Dashboard = () => {
    const data = [
        { name: 'A', value: 60 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
        { name: 'D', value: 20 },
        { name: 'E', value: 30 },
        { name: 'F', value: 20 },
        { name: 'G', value: 30 },
        { name: 'H', value: 100 },
        { name: 'I', value: 20 },
        { name: 'J', value: 30 },
        { name: 'K', value: 100 }
    ];

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Dados mockados para o gráfico de pizza
    const rawPieData = {
        Janeiro: [
            { name: "Stefanini", value: 5 },
            { name: "Manual", value: 5 },
            { name: "Besni", value: 6 },
            { name: "Renner", value: 11 },
        ],
        Fevereiro: [
            { name: "Stefanini", value: 3 },
            { name: "Manual", value: 8 },
            { name: "Besni", value: 2 },
            { name: "Renner", value: 4 },
        ],
        // Adicione dados para os outros meses conforme necessário
    };

    // Obter meses disponíveis a partir dos dados fornecidos
    const mesesDisponiveis = Object.keys(rawPieData);
    const [mesAtual, setMesAtual] = useState(mesesDisponiveis[0]);

    const pieData = rawPieData[mesAtual] || [];
    const pieColors = d3.scaleOrdinal(["#007AFF", "#FFADAD", "#FFC300", "#7C4DFF"]);

    // Dados mockados para o gráfico de barras
    const rawData = [
      { date: '2023-06-12', services: 1 },
      { date: '2023-06-13', services: 2 },
      { date: '2023-06-14', services: 3 },
      { date: '2023-06-15', services: 4 },
      { date: '2023-06-16', services: 5 },
      { date: '2023-06-17', services: 2 },
      { date: '2023-06-18', services: 3 },
      { date: '2023-06-20', services: 1 },
      { date: '2023-06-21', services: 2 },
      { date: '2023-06-22', services: 3 },
      { date: '2023-06-23', services: 4 },
      { date: '2023-06-24', services: 5 },
      { date: '2023-06-25', services: 2 },
      { date: '2023-06-26', services: 3 },
    ];

    // Calcular semanas disponíveis dinamicamente
    const weeks = useMemo(() => {
        const weekMap = {};
        rawData.forEach(({ date }) => {
            const current = new Date(date);
            const startOfWeek = new Date(current);
            startOfWeek.setDate(current.getDate() - current.getDay()); // Sunday

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

            const key = `${startOfWeek.toISOString().split('T')[0]} - ${endOfWeek.toISOString().split('T')[0]}`;
            if (!weekMap[key]) {
                weekMap[key] = [startOfWeek, endOfWeek];
            }
        });

        return Object.values(weekMap);
    }, [rawData]);

    const [semanaAtual, setSemanaAtual] = useState(weeks[0]);

    return (
        <>
            <div className={styles.conteudoTotal}>
                <SideBarColaborador />
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}>Financeiro</span>
                        <div className={styles.welcome}></div>
                    </div>
                    <div className={styles.geralDashboard}>
                        <div className={styles.kpiDashboard}>
                            <Kpi card="Empresa que mais deu lucro " mes="Nov" valor="4000" porcentagem="30%" empresa="Ford" />
                            <Kpi card="Empresa que mais deu lucro " mes="Nov" valor="4000" porcentagem="30%" empresa="Ford" />
                            <Kpi card="Empresa que mais deu lucro " mes="Nov" valor="4000" porcentagem="30%" empresa="Ford" />
                            <Kpi card="Empresa que mais deu lucro " mes="Nov" valor="4000" porcentagem="30%" empresa="Ford" />
                        </div>
                        <div className={styles.separador}>
                            <span className={styles.linhaHorizontal}></span>
                        </div>
                        <div className={styles.mainDashboard}>
                            <div className={styles.cardGraficosMaiores}>
                                <GastosGeraisChart />
                                <RelatorioGastosChart />
                            </div>
                            <div className={styles.cardGraficosMenores}>
                                <div className={styles.cardGraficoFinalizadosEmpresa}>
                                <span >Serviços finalizados por empresa</span>
                                    <MonthSelector months={mesesDisponiveis} onMonthChange={setMesAtual} />
                                    <ChartServicosFinalizadosEmpresa pieData={pieData} />
                                    <div className={styles.LegendFinalizadosEmpresa}>
                                        <FinalizadosEmpresaLegend data={pieData} colorScale={pieColors} />
                                    </div>
                                </div>
                                <div className={styles.cardGraficoFinalizadosSemana}>
                                    <span>Serviços finalizados por semana</span>
                                    <WeekSelectorChart weeks={weeks} onWeekChange={setSemanaAtual} />
                                    <ChartServicosFinalizadosSemana rawData={rawData.filter(d => {
                                        const date = new Date(d.date);
                                        return date >= semanaAtual[0] && date <= semanaAtual[1];
                                    })} />
                                    <WeekChartLegend />
                                </div>
                            </div>
                            <div className={styles.cardGastos}>
                                <span className={styles.cardGastosTitulos}>Gastos</span>
                                <Legend data={data} color={color} />
                                <div className={styles.cardGraficoGastos}>
                                    <GastosChart data={data} />
                                    <span className={styles.cardGraficoGastosValor}>R$8.250</span>
                                    <span className={styles.cardGraficoGastosTexto}>Gasto total</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
