import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraficoReceitaHora = ({ dadosDashboard }) => {
    const [dadosReceita, setDadosReceita] = useState({
        labels: [],
        valores: []
    });

    useEffect(() => {
        const atualizarDados = () => {
            const agora = new Date();

            // Gerar 6 intervalos de 30 em 30 minutos
            const intervalos = [];
            const valoresIntervalos = [];

            // Começar a partir da hora atual
            const inicioHoraAtual = new Date(agora);
            inicioHoraAtual.setSeconds(0, 0); // Começo da hora

            for (let i = 0; i < 6; i++) {
                const intervalo = new Date(inicioHoraAtual);
                intervalo.setMinutes(inicioHoraAtual.getMinutes() + (i * 30)); // Adiciona 30 minutos para cada intervalo
                intervalos.push(
                    intervalo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                );

                // Preencher valores com null inicialmente
                valoresIntervalos.push(null);
            }

            // Verificar se os dados recebidos estão dentro das últimas 3 horas
            if (dadosDashboard?.dataCriacao) {
                const dataCriacao = new Date(dadosDashboard.dataCriacao);
                const minutosPassados = Math.floor((agora - dataCriacao) / (1000 * 60)); // Calcular minutos passados

                if (minutosPassados < 180) { // Verifica se a data de criação está dentro das últimas 3 horas
                    // Identificar o índice do intervalo correspondente
                    const minutosCriacao = dataCriacao.getMinutes();
                    const indice = Math.floor(minutosCriacao / 30); // Encontra o intervalo de 30 minutos
                    if (indice < 6) { // Certifique-se de que o índice não exceda 5
                        valoresIntervalos[indice] = dadosDashboard.receita; // Adiciona o valor ao intervalo correto
                    }
                }
            }

            setDadosReceita({
                labels: intervalos, // Exibir todos os intervalos, mesmo que sem dados
                valores: valoresIntervalos
            });
        };

        // Atualizar dados imediatamente e a cada 30 minutos
        atualizarDados();
        const intervalId = setInterval(atualizarDados, 30 * 60 * 1000); // Atualizar a cada 30 minutos

        return () => clearInterval(intervalId);
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
            x: {
                title: {
                    display: true,
                    text: 'Horário'
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
                text: 'Receitas a Cada 30 Minutos (Últimas 3 Horas)'
            }
        }
    };

    const data = {
        labels: dadosReceita.labels,
        datasets: [
            {
                label: 'Receita',
                data: dadosReceita.valores,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                fill: true,
                spanGaps: true // Ignora gaps de valores `null`
            }
        ]
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line options={options} data={data} />
        </div>
    );
};

export default GraficoReceitaHora;