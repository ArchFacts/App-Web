import React from 'react';
import styles from './side_perfil_empresa.module.css';
import { useNavigate } from 'react-router-dom'; 

function SideBarPerfilEmpresa({ logo, titulo, atuacao, estado, email, telefone }) {
  const navigate = useNavigate();
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
      <button onClick={() => navigate("/")} className={styles.contatoEmpresa}>Entrar em contato</button>
      <button onClick={() =>  navigate("/empresas-parceiras")} className={styles.voltarEmpresa}>Voltar</button>
    </div>
  );
}

export default SideBarPerfilEmpresa;