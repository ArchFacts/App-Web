import SideBar from "../../../components/Side-Bar/sideBar";
import '../../../utils/global.css';
import styles from '../../Hub/Hub.module.css'
import stylesPerfil from '../perfil.module.css'
import ProfileData from "../../../components/Profile-Data/profileData";

const perfilBeneficiario = () => {
    return (
        <>
            <div className={styles.container}>
                <SideBar />
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}>Perfil</span>
                        <div className={styles.welcome}>
                        </div>
                    </div>
                    <div className={stylesPerfil.perfilContainer}>
                        <div className={stylesPerfil.esquerda}>
                            <div className={stylesPerfil.imagemPerfil}>
                            </div>
                            <h2>Luis Gustavo</h2>
                            <button className={stylesPerfil.botao}>Sair da conta</button>
                        </div>
                        <div className={stylesPerfil.direita}>
                            <ProfileData />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default perfilBeneficiario;