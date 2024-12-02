import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import styles from './RelatorioGastosChart.module.css';

const data = [
  { month: "Janeiro", value: 100, type: "Lucro", company: "Empresa A" },
  { month: "Janeiro", value: 80, type: "Despesa", company: "Empresa A" },
  { month: "Fevereiro", value: 120, type: "Lucro", company: "Empresa A" },
  { month: "Fevereiro", value: 90, type: "Despesa", company: "Empresa A" },
  { month: "Janeiro", value: 150, type: "Lucro", company: "Empresa B" },
  { month: "Janeiro", value: 100, type: "Despesa", company: "Empresa B" },
  { month: "Fevereiro", value: 130, type: "Lucro", company: "Empresa B" },
  { month: "Fevereiro", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Março", value: 150, type: "Lucro", company: "Empresa A" },
  { month: "Março", value: 100, type: "Despesa", company: "Empresa A" },
  { month: "Abril", value: 130, type: "Lucro", company: "Empresa A" },
  { month: "Abril", value: 110, type: "Despesa", company: "Empresa A" },
  { month: "Março", value: 150, type: "Lucro", company: "Empresa B" },
  { month: "Março", value: 100, type: "Despesa", company: "Empresa B" },
  { month: "Maio", value: 130, type: "Lucro", company: "Empresa B" },
  { month: "Junho", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Julho", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Agosto", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Setembro", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Outubro", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Novembro", value: 110, type: "Despesa", company: "Empresa B" },
  { month: "Dezembro", value: 110, type: "Lucro", company: "Empresa B" },
];

const RelatorioGastosChart = () => {
  const [selectedCompany, setSelectedCompany] = useState(data[0].company);

  useEffect(() => {
    const filteredData = data.filter(d => d.company === selectedCompany);
    drawChart(filteredData);

    function drawChart(filteredData) {
      const container = d3.select("#chart-container");
      container.selectAll("svg").remove();

      if (filteredData.length === 0) {
        container.html("<p>No data available for the selected company.</p>");
        return;
      }

      const width = 1100;
      const height = 300;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;

      const months = Array.from(new Set(filteredData.map(d => d.month)));
      const types = Array.from(new Set(filteredData.map(d => d.type)));

      const x0 = d3.scaleBand()
        .domain(months)
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      const x1 = d3.scaleBand()
        .domain(types)
        .range([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => d.value)])
        .nice()
        .range([height - marginBottom, marginTop]);

      const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      const groupedData = d3.group(filteredData, d => d.month);

      svg.append("g")
        .selectAll("g")
        .data(groupedData)
        .join("g")
        .attr("transform", d => `translate(${x0(d[0])},0)`)
        .selectAll("rect")
        .data(d => d[1])
        .join("rect")
        .attr("x", d => x1(d.type))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x1.bandwidth())
        .attr("fill", d => d.type === "Lucro" ? "steelblue" : "orange")
        .attr("rx", 5)
        .attr("ry", 5);

      svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .selectAll("text")
        .attr("class", styles.monthLabel);

      svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Valor"));

      const legend = svg.append("g")
        .attr("class", styles.legend)
        .attr("transform", "translate(50,30)")
        .selectAll("g")
        .data(types)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

      legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", d => d === "Lucro" ? "steelblue" : "orange");

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);
    }

  }, [selectedCompany]);

  const companies = Array.from(new Set(data.map(d => d.company)));

  return (
    <div className={styles.container}>
      <div className={styles.selectorContainer}>
        <div className={styles['legend-gastos-gerais']}>
          <div className={styles['legend-item-gastos-gerais']}>
            <div className={styles['legend-circle-gastos-gerais']} style={{ background: '#0066cc' }}></div>
            <span>Lucro</span>
          </div>
          <div className={styles['legend-item-gastos-gerais']}>
            <div className={styles['legend-circle-gastos-gerais']} style={{ background: '#ff9900' }}></div>
            <span>Despesas</span>
          </div>
        </div>
        <select 
          id="company-select"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>
      <div id="chart-container"></div>
    </div>
  );
};

export default RelatorioGastosChart;
