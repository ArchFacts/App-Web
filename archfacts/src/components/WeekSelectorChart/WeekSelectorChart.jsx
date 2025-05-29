// src/components/WeekSelectorChart/WeekSelectorChart.js

import React, { useState } from 'react';
import styles from './WeekSelectorChart.module.css';
import { timeFormat } from 'd3-time-format';

const WeekSelectorChart = ({ weeks, onWeekChange }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const handlePrevious = () => {
    if (currentWeekIndex > 0) {
      const newIndex = currentWeekIndex - 1;
      setCurrentWeekIndex(newIndex);
      onWeekChange(weeks[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentWeekIndex < weeks.length - 1) {
      const newIndex = currentWeekIndex + 1;
      setCurrentWeekIndex(newIndex);
      onWeekChange(weeks[newIndex]);
    }
  };

  const isPreviousDisabled = currentWeekIndex === 0 || !weeks[currentWeekIndex - 1];
  const isNextDisabled = currentWeekIndex === weeks.length - 1 || !weeks[currentWeekIndex + 1];

  // Formatar a semana como "12/06 até 19/06"
  const formatWeek = (week) => {
    const [start, end] = week;
    const format = timeFormat("%d/%m");
    return `${format(new Date(start))} até ${format(new Date(end))}`;
  };

  return (
    <div className={styles.weekSelectorContainer}>
      <span
        onClick={handlePrevious}
        className={`${styles.weekButton} ${isPreviousDisabled ? styles.disabled : ''}`}
      >
        &lt;
      </span>
      <span className={styles.currentWeek}>{formatWeek(weeks[currentWeekIndex])}</span>
      <span
        onClick={handleNext}
        className={`${styles.weekButton} ${isNextDisabled ? styles.disabled : ''}`}
      >
        &gt;
      </span>
    </div>
  );
};

export default WeekSelectorChart;
