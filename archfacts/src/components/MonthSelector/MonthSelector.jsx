// src/components/MonthSelector/MonthSelector.js

import React, { useState } from 'react';
import styles from './MonthSelector.module.css';

const MonthSelector = ({ months, onMonthChange }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const handlePrevious = () => {
    if (currentMonthIndex > 0) {
      const newIndex = currentMonthIndex - 1;
      setCurrentMonthIndex(newIndex);
      onMonthChange(months[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentMonthIndex < months.length - 1) {
      const newIndex = currentMonthIndex + 1;
      setCurrentMonthIndex(newIndex);
      onMonthChange(months[newIndex]);
    }
  };

  const isPreviousDisabled = currentMonthIndex === 0;
  const isNextDisabled = currentMonthIndex === months.length - 1;

  return (
    <div className={styles.monthSelectorContainer}>
      <span
        onClick={handlePrevious}
        className={`${styles.monthButton} ${isPreviousDisabled ? styles.disabled : ''}`}
      >
        &lt;
      </span>
      <span className={styles.currentMonth}>{months[currentMonthIndex]}</span>
      <span
        onClick={handleNext}
        className={`${styles.monthButton} ${isNextDisabled ? styles.disabled : ''}`}
      >
        &gt;
      </span>
    </div>
  );
};

export default MonthSelector;
