import React, { useState } from "react";
import styles from "./infos_empresa.module.css";
import ServiceCard from "../Service-Card/service_card";
import SelectBanner from "../Select-Banner/SelectBanner";

function InfosEmpresa({ banner, descricaoTitulo, descricaoDetalhada, servicosTitulo }) {
  const [bannerAtualizado, setBannerAtualizado] = useState(banner || "");

  return (
    <div className={styles.infosEmpresa}>
      <SelectBanner bannerAtualizado={bannerAtualizado} setBannerAtualizado={setBannerAtualizado} />
      <div className={styles.descricao}>
        <h2>{descricaoTitulo}</h2>
        <input type="text" src={descricaoDetalhada} />
      </div>
      <div className={styles.servicos}>
        <h2>{servicosTitulo}</h2>
        <ServiceCard />
      </div>
    </div>
  );
}

export default InfosEmpresa;
