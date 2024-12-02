// src/components/MonthSelector/MonthSelector.js

import React, { useState } from 'react'; // Certifique-se de que useState está sendo importado
import styles from './MonthSelector.module.css';

const MonthSelector = ({ months, onMonthChange, availableData = {} }) => {
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

  const isPreviousDisabled = currentMonthIndex === 0 || !availableData[months[currentMonthIndex - 1]];
  const isNextDisabled = currentMonthIndex === months.length - 1 || !availableData[months[currentMonthIndex + 1]];

  return (
    <div className={styles.monthSelectorContainer}>
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className={styles.monthButton}
      >
        &lt;
      </button>
      <span className={styles.currentMonth}>{months[currentMonthIndex]}</span>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={styles.monthButton}
      >
        &gt;
      </button>
    </div>
  );
};

export default MonthSelector;
