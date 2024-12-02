import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styles from './GastosLegend.module.css';

const Legend = ({ data, color }) => {
  return (
    <Scrollbars 
      style={{ width: '100%', maxHeight: 400 }}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      <ul className={styles.legend}>
        {data.map(d => (
          <li key={d.name} className={styles.legendItem}>
            <span>{d.name} R${d.value}</span>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: color(d.name) }}
            ></div>
          </li>
        ))}
      </ul>
    </Scrollbars>
  );
};

export default Legend;