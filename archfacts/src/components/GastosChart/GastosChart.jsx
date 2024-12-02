import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GastosChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Limpar qualquer conteúdo existente
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 360; // Largura ajustada
    const height = 360; // Altura ajustada
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius - 1);

    const pie = d3.pie()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.value);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2 - 50, -height / 2 - 50, width + 100, height + 100]) // Ampliado para evitar cortes
      .attr("style", "max-width: 100%; height: auto;");

    svg.append("g")
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    const labelArc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius + 30); // Borda para posicionar as bolinhas

    const total = d3.sum(data, d => d.value);

    // Filtrar fatias grandes o suficiente para exibir bolinhas e textos
    const angleThreshold = 0.1; // Determina quais fatias exibem bolinhas
    const largeSlices = pie(data).filter(d => (d.endAngle - d.startAngle) > angleThreshold);

    // Adicionar bolinhas dinâmicas, ajustando para fatias menores
    svg.append("g")
      .selectAll("circle")
      .data(largeSlices)
      .join("circle")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("r", d => {
        const angle = d.endAngle - d.startAngle;
        // Ajustar tamanho com base no ângulo, permitindo bolinhas menores para fatias pequenas
        return Math.max(5, Math.min(20*(angle+0.7)));
      })
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5);

    // Adicionar texto dentro das bolinhas
    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(largeSlices)
      .join("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .text(d => {
        const percentage = ((d.data.value / total) * 100).toFixed(0);
        return `${percentage}%`;
      });
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default GastosChart;
