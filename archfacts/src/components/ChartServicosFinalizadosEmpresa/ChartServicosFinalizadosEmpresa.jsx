// src/components/ChartServicosFinalizadosEmpresa/ChartServicosFinalizadosEmpresa.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChartServicosFinalizadosEmpresa = () => {
  const chartRef = useRef();

  const pieData = [
    { name: "Stefanini", value: 5 },
    { name: "Manual", value: 5 },
    { name: "Besni", value: 6 },
    { name: "Renner", value: 11 },
  ];

  const pieColors = d3.scaleOrdinal(["#007AFF", "#FFADAD", "#FFC300", "#7C4DFF"]);

  useEffect(() => {
    const width = 150;
    const height = 150;
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc()
      .innerRadius(radius * 0.8 )
      .outerRadius(radius);

    const pie = d3.pie()
      .value(d => d.value);

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    svg.selectAll("path")
      .data(pie(pieData))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => pieColors(i));
  }, [pieData, pieColors]);

  return <svg ref={chartRef}></svg>;
};

export default ChartServicosFinalizadosEmpresa;
