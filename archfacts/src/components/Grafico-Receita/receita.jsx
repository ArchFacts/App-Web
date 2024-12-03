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

            // Gerar intervalos de 10 em 10 minutos dentro da hora atual
            const intervalos = [];
            const valoresIntervalos = [];

            const inicioHoraAtual = new Date(agora);
            inicioHoraAtual.setMinutes(0, 0, 0); // Começo da hora
            for (let minuto = 0; minuto < 60; minuto += 10) {
                const intervalo = new Date(inicioHoraAtual);
                intervalo.setMinutes(minuto);
                intervalos.push(
                    intervalo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                );

                // Preencher valores com null inicialmente
                valoresIntervalos.push(null);
            }

            // Verificar se os dados recebidos estão dentro da hora atual
            if (dadosDashboard?.dataCriacao) {
                const dataCriacao = new Date(dadosDashboard.dataCriacao);
                if (
                    dataCriacao >= inicioHoraAtual &&
                    dataCriacao < new Date(inicioHoraAtual.getTime() + 60 * 60 * 1000) // Fim da hora
                ) {
                    // Identificar o índice do intervalo correspondente
                    const minutosCriacao = dataCriacao.getMinutes();
                    const indice = Math.floor(minutosCriacao / 10); // Encontra o intervalo de 10 minutos
                    valoresIntervalos[indice] = dadosDashboard.receita; // Adiciona o valor ao intervalo correto
                }
            }

            setDadosReceita({
                labels: intervalos, // Exibir todos os intervalos, mesmo que sem dados
                valores: valoresIntervalos
            });
        };

        // Atualizar dados imediatamente e a cada minuto
        atualizarDados();
        const intervalId = setInterval(atualizarDados, 60 * 1000); // Atualizar a cada minuto

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
                text: 'Receitas por Hora (Atualização de 10 em 10 minutos)'
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
