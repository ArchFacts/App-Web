import React, { useEffect } from 'react';
import * as d3 from 'd3';
import styles from './GastosGeraisChart.module.css';


const GastosGeraisChart = () => {
  useEffect(() => {
    const mockData = [
      { tipo: "chamado", valor: 650.0, fechamento: "2023-12-20T11:00:00" },
      { tipo: "tarefa", valor: 300.0, fechamento: "2023-12-28T15:00:00" },
      { tipo: "chamado", valor: 550.0, fechamento: "2024-01-15T13:00:00" },
      { tipo: "tarefa", valor: 200.0, fechamento: "2024-01-05T08:00:00" },
      { tipo: "chamado", valor: 400.0, fechamento: "2024-02-25T09:00:00" },
      { tipo: "tarefa", valor: 150.0, fechamento: "2024-02-10T16:00:00" },
      { tipo: "chamado", valor: 750.0, fechamento: "2024-03-05T11:00:00" },
      { tipo: "tarefa", valor: 300.0, fechamento: "2024-03-20T14:00:00" },
      { tipo: "chamado", valor: 500.0, fechamento: "2024-04-01T12:00:00" },
      { tipo: "tarefa", valor: 250.0, fechamento: "2024-04-15T10:00:00" },
      { tipo: "chamado", valor: 700.0, fechamento: "2024-05-10T09:30:00" },
      { tipo: "tarefa", valor: 350.0, fechamento: "2024-05-20T13:00:00" },
      { tipo: "chamado", valor: 650.0, fechamento: "2024-06-20T11:00:00" },
      { tipo: "tarefa", valor: 300.0, fechamento: "2024-06-28T15:00:00" },
      { tipo: "chamado", valor: 550.0, fechamento: "2024-07-15T13:00:00" },
      { tipo: "tarefa", valor: 200.0, fechamento: "2024-07-05T08:00:00" },
      { tipo: "chamado", valor: 400.0, fechamento: "2024-08-25T09:00:00" },
      { tipo: "tarefa", valor: 150.0, fechamento: "2024-08-10T16:00:00" },
      { tipo: "chamado", valor: 750.0, fechamento: "2024-09-05T11:00:00" },
      { tipo: "tarefa", valor: 300.0, fechamento: "2024-09-20T14:00:00" },
      { tipo: "chamado", valor: 500.0, fechamento: "2024-10-15T10:00:00" },
      { tipo: "tarefa", valor: 250.0, fechamento: "2024-10-10T09:00:00" },
      { tipo: "chamado", valor: 600.0, fechamento: "2024-11-06T11:00:00" },
      { tipo: "tarefa", valor: 250.0, fechamento: "2024-11-05T16:00:00" },
      { tipo: "chamado", valor: 400.0, fechamento: "2024-11-08T13:00:00" },
      { tipo: "tarefa", valor: 100.0, fechamento: "2024-11-07T10:00:00" },
      { tipo: "chamado", valor: 700.0, fechamento: "2024-11-10T09:00:00" },
      { tipo: "tarefa", valor: 300.0, fechamento: "2024-11-09T15:00:00" },
      { tipo: "chamado", valor: 500.0, fechamento: "2024-11-12T12:00:00" },
      { tipo: "tarefa", valor: 200.0, fechamento: "2024-11-11T11:00:00" },
      { tipo: "chamado", valor: 650.0, fechamento: "2024-11-14T10:00:00" },
      { tipo: "tarefa", valor: 350.0, fechamento: "2024-11-13T14:00:00" },
      { tipo: "chamado", valor: 550.0, fechamento: "2024-11-16T08:00:00" },
      { tipo: "tarefa", valor: 150.0, fechamento: "2024-11-15T13:00:00" },
      { tipo: "chamado", valor: 600.0, fechamento: "2024-11-18T11:00:00" },
      { tipo: "tarefa", valor: 250.0, fechamento: "2024-11-17T15:00:00" },
      { tipo: "chamado", valor: 400.0, fechamento: "2024-11-20T16:00:00" },
      { tipo: "tarefa", valor: 100.0, fechamento: "2024-11-19T09:00:00" },
      { tipo: "chamado", valor: 700.0, fechamento: "2024-11-22T10:00:00" },
      { tipo: "tarefa", valor: 300.0, fechamento: "2024-11-26T14:00:00" },
      { tipo: "chamado", valor: 500.0, fechamento: "2024-11-27T08:00:00" },
      { tipo: "tarefa", valor: 200.0, fechamento: "2024-11-28T12:00:00" },
    ];

    const getCurrentDateInBrasilia = () => {
      const now = new Date();
      const utcNow = now.getTime() + (now.getTimezoneOffset() * 60000);
      const brasiliaOffset = -3; // UTC-3
      return new Date(utcNow + (3600000 * brasiliaOffset));
    };

    const formatPeriod = (date, periodType) => {
      const locale = 'pt-BR';
      if (periodType === "12months" || periodType === "3months") {
        return date.toLocaleString(locale, { month: 'short'}).replace('.', '');
      } else if (periodType === "30days" || periodType === "7days") {
        return date.toLocaleString(locale, { day: '2-digit', month: '2-digit' });
      }
    };

    const processData = (rawData, periodType) => {
      const dataMap = {};
      const now = getCurrentDateInBrasilia();

      rawData.forEach(item => {
        const date = new Date(item.fechamento);
        let periodKey;

        if (periodType === "12months") {
          if (date >= new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())) {
            periodKey = formatPeriod(date, periodType);
          }
        } else if (periodType === "3months") {
          if (date >= new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())) {
            periodKey = formatPeriod(date, periodType);
          }
        } else if (periodType === "30days") {
          if (date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)) {
            periodKey = formatPeriod(date, periodType);
          }
        } else if (periodType === "7days") {
          if (date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)) {
            periodKey = formatPeriod(date, periodType);
          }
        }

        if (periodKey) {
          if (!dataMap[periodKey]) {
            dataMap[periodKey] = { lucro: 0, despesa: 0 };
          }

          if (item.tipo === "chamado") {
            dataMap[periodKey].lucro += item.valor;
          } else if (item.tipo === "tarefa") {
            dataMap[periodKey].despesa += item.valor;
          }
        }
      });

      return Object.entries(dataMap).map(([key, values]) => ({
        period: key,
        lucro: values.lucro,
        receita: values.lucro + values.despesa,
        despesas: values.despesa
      }));
    };

    const margins = { top: 20, right: 30, bottom: 40, left: 50 };
    const chartWidth = 800 - margins.left - margins.right; // Ajuste a largura aqui
    const chartHeight = 270 - margins.top - margins.bottom;

    const svg = d3.select("#chart-gastos-gerais")
      .html("") 
      .append("svg")
      .attr("width", chartWidth + margins.left + margins.right)
      .attr("height", chartHeight + margins.top + margins.bottom)
      .append("g")
      .attr("transform", `translate(${margins.left},${margins.top})`);

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", styles['tooltip-gastos-gerais'])
      .style("opacity", 0);

    const updateChart = (data) => {
      const xScale = d3.scalePoint()
        .domain(data.map(d => d.period))
        .range([0, chartWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => Math.max(d.lucro, d.receita, d.despesas))])
        .range([chartHeight, 0]);

      svg.selectAll(".x-axis").remove();
      svg.selectAll(".y-axis").remove();

      // Renderiza o eixo x para os rótulos
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

      // Renderiza o eixo y
      svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));

      svg.selectAll(".line-lucro").remove();
      svg.selectAll(".line-receita").remove();
      svg.selectAll(".line-despesas").remove();

      const lineGenerators = {
        lucro: d3.line()
          .x(d => xScale(d.period))
          .y(d => yScale(d.lucro))
          .curve(d3.curveCardinal),
        receita: d3.line()
          .x(d => xScale(d.period))
          .y(d => yScale(d.receita))
          .curve(d3.curveCardinal),
        despesas: d3.line()
          .x(d => xScale(d.period))
          .y(d => yScale(d.despesas))
          .curve(d3.curveCardinal),
      };

      svg.append("path")
        .datum(data)
        .attr("class", "line-lucro")
        .attr("fill", "none")
        .attr("stroke", "#0066cc")
        .attr("stroke-width", 2)
        .attr("d", lineGenerators.lucro);

      svg.append("path")
        .datum(data)
        .attr("class", "line-receita")
        .attr("fill", "none")
        .attr("stroke", "#00ccff")
        .attr("stroke-width", 2)
        .attr("d", lineGenerators.receita);

      svg.append("path")
        .datum(data)
        .attr("class", "line-despesas")
        .attr("fill", "none")
        .attr("stroke", "#ff9900")
        .attr("stroke-width", 2)
        .attr("d", lineGenerators.despesas);

      // Adiciona linhas horizontais para os dados
      svg.selectAll("line.horizontal-grid").remove();
      svg.selectAll("line.horizontal-grid")
        .data(yScale.ticks())
        .enter()
        .append("line")
        .attr("class", "horizontal-grid")
        .attr("x1", 0)
        .attr("x2", chartWidth)
        .attr("y1", d => yScale(d))
        .attr("y2", d => yScale(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1);
    };

    const fetchDataAndRender = (periodType) => {
      const rawData = mockData;
      const processedData = processData(rawData, periodType);
      updateChart(processedData);
    };

    fetchDataAndRender("12months");

    const buttons = document.querySelectorAll(`.${styles['btn-gastos-gerais']}`);
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove(styles.active));
        btn.classList.add(styles.active);
        const periodType = btn.textContent.toLowerCase().replace(" ", "");
        fetchDataAndRender(periodType);
      });
    });
  }, []);
  return (
    <div className={styles['chart-container']}>
      <div className={styles['chart-title-gastos-gerais']}>Relatório de Gastos Gerais - Gráfico de Linha</div>
      <div className={styles['btn-and-legend-gastos-gerais']}>
        <div className={styles['btn-group-gastos-gerais']}>
          <button className={`${styles['btn-gastos-gerais']} ${styles.active}`}>12 Months</button>
          <button className={styles['btn-gastos-gerais']}>3 months</button>
          <button className={styles['btn-gastos-gerais']}>30 days</button>
          <button className={styles['btn-gastos-gerais']}>7 days</button>
        </div>
        <div className={styles['legend-gastos-gerais']}>
          <div className={styles['legend-item-gastos-gerais']}>
            <div className={styles['legend-circle-gastos-gerais']} style={{ background: '#0066cc' }}></div>
            <span>Lucro</span>
          </div>
          <div className={styles['legend-item-gastos-gerais']}>
            <div className={styles['legend-circle-gastos-gerais']} style={{ background: '#00ccff' }}></div>
            <span>Receita</span>
          </div>
          <div className={styles['legend-item-gastos-gerais']}>
            <div className={styles['legend-circle-gastos-gerais']} style={{ background: '#ff9900' }}></div>
            <span>Despesas</span>
          </div>
        </div>
      </div>
      <div id="chart-gastos-gerais"></div>
    </div>
  );
};

export default GastosGeraisChart;
