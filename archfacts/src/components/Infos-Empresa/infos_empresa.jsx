import React from 'react';
import styles from './infos_empresa.module.css';
import bannerImage from '../../utils/assets/bannerVolks.png';

function InfosEmpresa({ banner, descricaoTitulo, descricaoDetalhada, servicosTitulo }) {
  return (
    <div className={styles.infosEmpresa}>
      <div className={styles.banner}>
        <img className={styles.bannerImage} src={bannerImage} alt="Banner da empresa" />
      </div>
      <div className={styles.descricao}>
        <h2>{descricaoTitulo}</h2>
        <p>{descricaoDetalhada}</p>
      </div>
      <div className={styles.servicos}>
        <h2>{servicosTitulo}</h2>
      </div>
    </div>
  );
}

export default InfosEmpresa;