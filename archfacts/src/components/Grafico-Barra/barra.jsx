import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoFinanceiroSemanal = ({ dadosDashboard }) => {
    const [dadosFinanceiros, setDadosFinanceiros] = useState({
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        lucro: [],
        despesa: [],
        percentualLucro: []
    });

    useEffect(() => {
        const processarDadosFinanceiros = () => {
            const labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

            // Inicializar arrays com zeros
            const lucro = new Array(labels.length).fill(0);
            const despesa = new Array(labels.length).fill(0);
            const percentualLucro = new Array(labels.length).fill(0);

            // Se tiver dados no dashboard
            if (dadosDashboard) {
                // Exemplo de como preencher (ajuste conforme necessário)
                lucro[new Date().getDay() - 1] = dadosDashboard.lucroTotal || 0;
                despesa[new Date().getDay() - 1] = dadosDashboard.despesaTotal || 0;

                // Calcular percentual de lucro
                const lucroPercentual = dadosDashboard.despesaTotal > 0
                    ? (dadosDashboard.lucroTotal / dadosDashboard.despesaTotal * 100)
                    : 0;

                percentualLucro[new Date().getDay() - 1] = lucroPercentual;
            }

            setDadosFinanceiros({
                labels,
                lucro,
                despesa,
                percentualLucro
            });
        };

        processarDadosFinanceiros();
    }, [dadosDashboard]);

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor (R$)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Percentual (%)'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Análise Financeira Semanal'
            }
        }
    };

    const data = {
        labels: dadosFinanceiros.labels,
        datasets: [
            {
                type: 'bar',
                label: 'Lucro',
                data: dadosFinanceiros.lucro,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                type: 'bar',
                label: 'Despesa',
                data: dadosFinanceiros.despesa,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                type: 'line',
                label: '% Lucro',
                data: dadosFinanceiros.percentualLucro,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                yAxisID: 'y1'
            }
        ]
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default GraficoFinanceiroSemanal;