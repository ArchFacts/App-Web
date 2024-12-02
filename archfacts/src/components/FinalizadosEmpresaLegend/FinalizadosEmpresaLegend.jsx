// src/components/FinalizadosEmpresaLegend/FinalizadosEmpresaLegend.js

import React from 'react';

const FinalizadosEmpresaLegend = ({ data, colorScale }) => {
  return (
    <>
      {data.map((entry, index) => (
        <div key={entry.name} >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: colorScale(index),
              marginRight: '8px',
            }}
          ></div>
          <span style={{
            fontSize:'12px'
            }}>{entry.name}: {entry.value} </span>
        </div>
      ))}
    </>
  );
};

export default FinalizadosEmpresaLegend;
