import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import styles from './RelatorioGastosChart.module.css';

// Suponha que suas datas estejam neste formato
const data = [
  { date: "2023-01-15", value: 100, type: "Lucro", company: "Empresa A" },
  { date: "2023-01-20", value: 80, type: "Despesa", company: "Empresa A" },
  // Valores adicionais para expandir seu conjunto de dados
  { date: "2023-02-10", value: 150, type: "Lucro", company: "Empresa B" },
  { date: "2023-02-15", value: 90, type: "Despesa", company: "Empresa A" },
  { date: "2023-03-05", value: 200, type: "Lucro", company: "Empresa A" },
  { date: "2023-03-12", value: 50, type: "Despesa", company: "Empresa B" },
  { date: "2023-04-20", value: 300, type: "Lucro", company: "Empresa B" },
  { date: "2023-04-25", value: 120, type: "Despesa", company: "Empresa A" },
  { date: "2023-05-15", value: 85, type: "Lucro", company: "Empresa A" },
  { date: "2023-05-18", value: 60, type: "Despesa", company: "Empresa B" },
  { date: "2023-06-10", value: 180, type: "Lucro", company: "Empresa B" },
  { date: "2023-06-25", value: 110, type: "Despesa", company: "Empresa A" },
  { date: "2023-07-01", value: 130, type: "Lucro", company: "Empresa A" },
  { date: "2023-07-15", value: 75, type: "Despesa", company: "Empresa B" },
  { date: "2023-08-05", value: 220, type: "Lucro", company: "Empresa B" },
  { date: "2023-08-18", value: 140, type: "Despesa", company: "Empresa A" },
  { date: "2023-09-10", value: 190, type: "Lucro", company: "Empresa A" },
  { date: "2023-09-20", value: 90, type: "Despesa", company: "Empresa B" },
  { date: "2023-10-15", value: 210, type: "Lucro", company: "Empresa B" },
  { date: "2023-10-25", value: 130, type: "Despesa", company: "Empresa A" },
  { date: "2023-11-05", value: 95, type: "Lucro", company: "Empresa A" },
  { date: "2023-11-20", value: 70, type: "Despesa", company: "Empresa B" },
  { date: "2023-12-10", value: 170, type: "Lucro", company: "Empresa B" },
  { date: "2023-12-25", value: 100, type: "Despesa", company: "Empresa A" },
  { date: "2024-01-15", value: 115, type: "Lucro", company: "Empresa A" },
  { date: "2024-01-25", value: 85, type: "Despesa", company: "Empresa B" },
  { date: "2024-02-10", value: 205, type: "Lucro", company: "Empresa B" },
  { date: "2024-02-20", value: 95, type: "Despesa", company: "Empresa A" },
  { date: "2024-03-05", value: 245, type: "Lucro", company: "Empresa A" },
  { date: "2024-03-18", value: 55, type: "Despesa", company: "Empresa B" },
  { date: "2024-04-10", value: 305, type: "Lucro", company: "Empresa B" },
  { date: "2024-04-20", value: 125, type: "Despesa", company: "Empresa A" },
  { date: "2024-05-15", value: 95, type: "Lucro", company: "Empresa A" },
  { date: "2024-05-18", value: 65, type: "Despesa", company: "Empresa B" },
  { date: "2024-06-10", value: 195, type: "Lucro", company: "Empresa B" },
  { date: "2024-06-25", value: 115, type: "Despesa", company: "Empresa A" },
  { date: "2024-07-01", value: 135, type: "Lucro", company: "Empresa A" },
  { date: "2024-07-15", value: 80, type: "Despesa", company: "Empresa B" },
  { date: "2024-08-05", value: 225, type: "Lucro", company: "Empresa B" },
  { date: "2024-08-18", value: 145, type: "Despesa", company: "Empresa A" },
  { date: "2024-09-10", value: 195, type: "Lucro", company: "Empresa A" },
  { date: "2024-09-20", value: 95, type: "Despesa", company: "Empresa B" },
  { date: "2024-10-15", value: 215, type: "Lucro", company: "Empresa B" },
  { date: "2024-10-25", value: 135, type: "Despesa", company: "Empresa A" },
  { date: "2024-11-05", value: 100, type: "Lucro", company: "Empresa A" },
  { date: "2024-11-20", value: 75, type: "Despesa", company: "Empresa B" },
  { date: "2024-12-10", value: 175, type: "Lucro", company: "Empresa B" },
  { date: "2024-12-25", value: 105, type: "Despesa", company: "Empresa A" }
  // Continue com mais dados se necessário
];
const RelatorioGastosChart = () => {
  const [selectedCompany, setSelectedCompany] = useState(data[0].company);
  const [selectedYear, setSelectedYear] = useState(new Date(data[0].date).getFullYear());

  useEffect(() => {
    const filteredData = data.filter(d => 
      d.company === selectedCompany && 
      new Date(d.date).getFullYear() === selectedYear
    );

    // Agrupar e somar dados por mês e ano
    const groupedData = d3.rollup(
      filteredData,
      v => d3.sum(v, d => d.value),
      d => `${new Date(d.date).getFullYear()}-${new Date(d.date).getMonth() + 1}`, // Agrupa por ano e mês
      d => d.type
    );

    const processedData = Array.from(groupedData, ([key, typeMap]) => {
      const [year, month] = key.split('-');
      const monthNames = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
      return {
        year,
        month: monthNames[parseInt(month, 10) - 1],
        values: Array.from(typeMap, ([type, value]) => ({ type, value }))
      };
    });

    drawChart(processedData);

    function drawChart(processedData) {
      const container = d3.select("#chart-container");
      container.selectAll("svg").remove();

      if (processedData.length === 0) {
        container.html("<p>No data available for the selected company and year.</p>");
        return;
      }

      const width = 1100;
      const height = 300;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;

      const x0 = d3.scaleBand()
        .domain(processedData.map(d => `${d.month} ${d.year}`))
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      const types = Array.from(new Set(filteredData.map(d => d.type)));

      const x1 = d3.scaleBand()
        .domain(types)
        .range([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3.scaleLinear()
        .domain([0, d3.max(processedData.flatMap(d => d.values.map(v => v.value)))])
        .nice()
        .range([height - marginBottom, marginTop]);

      const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      svg.append("g")
        .selectAll("g")
        .data(processedData)
        .join("g")
        .attr("transform", d => `translate(${x0(`${d.month} ${d.year}`)},0)`)
        .selectAll("rect")
        .data(d => d.values)
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

  }, [selectedCompany, selectedYear]);

  const companies = Array.from(new Set(data.map(d => d.company)));
  const years = Array.from(new Set(data.map(d => new Date(d.date).getFullYear())));

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
          className={styles['seletores']}
          >
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
        <select 
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className={styles['seletores']}
          >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div id="chart-container"></div>
    </div>
  );
};

export default RelatorioGastosChart;
