// src/components/WeekChartLegend/WeekChartLegend.js

import React from 'react';
import styles from './WeekChartLegend.module.css';

const WeekChartLegend = () => {
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <div className={styles.legendCircle} style={{ backgroundColor: '#ADD8E6' }}></div>
        <span>1 serviço</span>
      </div>
      <div className={styles.legendItem}>
        <div className={styles.legendCircle} style={{ backgroundColor: '#4682B4' }}></div>
        <span>2 serviços</span>
      </div>
      <div className={styles.legendItem}>
        <div className={styles.legendCircle} style={{ backgroundColor: '#00008B' }}></div>
        <span>3 ou mais serviços</span>
      </div>
    </div>
  );
};

export default WeekChartLegend;
