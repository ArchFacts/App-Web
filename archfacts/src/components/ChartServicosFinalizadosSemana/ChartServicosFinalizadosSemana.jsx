// src/components/ChartServicosFinalizadosSemana/ChartServicosFinalizadosSemana.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartServicosFinalizadosSemana = ({ rawData }) => {
  const chartRef = useRef();

  // Dias da semana em português
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Processar os dados para garantir que todos os dias da semana estão representados
  const barData = diasSemana.map((day, index) => {
    const found = rawData.find(d => new Date(d.date).getDay() === index);
    return {
      day,
      services: found ? found.services : 0,
    };
  });

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Limpar o conteúdo anterior
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3.select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(diasSemana)
      .range([0, width])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, Math.ceil(d3.max(barData, d => d.services))]) // Garantir que o domínio seja inteiro
      .nice()
      .range([height, 0]);

    const colors = d3.scaleOrdinal()
      .domain([1, 2, 3]) // Mapeia as quantidades de serviços
      .range(['#ADD8E6', '#4682B4', '#00008B']); // Cores de acordo com a legenda

    svg.selectAll("rect")
      .data(barData)
      .enter().append("rect")
      .attr("x", d => x(d.day))
      .attr("y", d => y(d.services))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.services))
      .attr("fill", d => {
        if (d.services === 1) return colors(1);
        if (d.services === 2) return colors(2);
        return colors(3); // 3 ou mais serviços
      })
      .attr("rx", 5)
      .attr("ry", 5);

    svg.append("g")
      .call(d3.axisLeft(y).ticks(y.domain()[1]).tickFormat(d3.format("d"))); // Use o formato "d" para inteiros

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  }, [barData]);

  return <svg ref={chartRef}></svg>;
};

export default ChartServicosFinalizadosSemana;
