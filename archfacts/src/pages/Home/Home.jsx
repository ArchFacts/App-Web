import React from 'react';
import '../../utils/global.css';
import NavHome from '../../components/Nav-Home/navhome';
import styles from './Home.module.css';
import logoImage from '../../utils/assets/logo.svg';
import logoText from '../../utils/assets/logo_af.png';
import HeroInfo from '../../components/Hero-Info/heroinfo';
import HeroFooter from '../../components/Hero-Footer/herofooter'

const Home = () => {
    return (
        <>
            <section>
                <NavHome logo_image={logoImage} logo_text={logoText} />
                <div className={styles.hero_div}>
                    <div className={styles.content}>
                        <HeroInfo />
                        <HeroFooter />
                    </div>
                </div>
            </section>
            <section>
                <div className={styles.solved_problems}>
                    <h1 className={styles.title}>PROBLEMAS RESOLVIDOS PELA ARCHFACTS</h1>
                </div>
            </section>
        </>
    )
}


export default Home