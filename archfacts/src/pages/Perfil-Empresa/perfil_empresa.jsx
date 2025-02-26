import React from 'react';
import SideBarPerfilEmpresa from '../../components/Side-Bar-Perfil-Empresa/side_perfil_empresa';
import InfosEmpresa from '../../components/Infos-Empresa/infos_empresa';
import Volks from '../../utils/assets/volks.png';
import styles from './perfil_empresa.module.css';

function PerfilEmpresa() {
  return (
    <div className={styles.container}>
      <SideBarPerfilEmpresa
        logo={Volks}
        titulo="Volkswagen"
        atuacao="Data de Registro: XX/XX/XXXX"
        estado="Estado: Todo o país"
        email="E-mail: volks@gmail.com"
        telefone="Telefone: 999999999"
      />
      <InfosEmpresa
        descricaoTitulo="Descrição da empresa"
        descricaoDetalhada="A Volkswagen, fundada em 1937, é uma das maiores montadoras do mundo. Conhecida por veículos icônicos como o Fusca e o Golf, a empresa foca em inovação, segurança e sustentabilidade. Também investe em carros elétricos e tecnologias autônomas."
        servicosTitulo="Serviços"
      />
    </div>
  );
}

export default PerfilEmpresa;