import styles from './profileData.module.css'

const ProfileData = () => {
    return (
        <div className={styles.card}>
           
                <div className={styles.divInput}>
                    <label>E-mail</label>
                    <input placeholder='Ex: LuisVolks@gmail.com' className={styles.input} type="text" />
                </div>
                <div className={styles.divInput}>
                    <label>Telefone</label>
                    <input placeholder='Ex: 11 99422-9883' className={styles.input} type="text" />
                </div>
                <div className={styles.divInput}>
                    <label>Data de registro</label>
                    <input className={styles.input} type="date" />
                </div>
            <button className={styles.botao}>Salvar Alterações</button>
        </div>
    )
}

export default ProfileData;