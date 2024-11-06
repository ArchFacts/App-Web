import React from 'react';
import styles from './side_perfil_empresa.module.css';

function SideBarPerfilEmpresa({ logo, titulo, atuacao, estado, email, telefone }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img className={styles.imagemEmpresa} src={logo} alt="Logo da empresa" />
      </div>
      <div className={styles.title}>
        <p>{titulo}</p>
      </div>
      <div className={styles.info}>
        <p>{atuacao}</p>
        <p>{estado}</p>
        <p>{email}</p>
        <p>{telefone}</p>
      </div>
      <button className={styles.contatoEmpresa}>Entrar em contato</button>
      <button className={styles.voltarEmpresa}>Voltar</button>
    </div>
  );
}

export default SideBarPerfilEmpresa;