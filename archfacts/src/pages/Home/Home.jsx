import React, { useState, useEffect } from 'react';
import '../../utils/global.css';
import NavHome from '../../components/Nav-Home/navhome';
import styles from './Home.module.css';
import logoImage from '../../utils/assets/logo.svg';
import logoText from '../../utils/assets/logo_af.png';
import HeroInfo from '../../components/Hero-Info/heroinfo';
import HeroFooter from '../../components/Hero-Footer/herofooter';
import VerticalMenu from '../../components/Vertical-Menu/verticalmenu';
import InfoBox from '../../components/Info-Box/infobox';
import icone_gestao from '../../utils/assets/gestao.svg';
import icone_seta from '../../utils/assets/left_arrow.svg'
import InterestBox from '../../components/Interest-Box/interestbox';
import BigCarousel from '../../components/Big-Carousel/bigcarousel';
import Profile from '../../components/profile/profile';
import Contact from '../../components/Contact/contact';
import MainFooter from '../../components/Main-Footer/mainfooter';

const Home = () => {

    const [infoBoxData, setInfoBoxData] = useState ({
        title: "Selecione uma opção à esquerda!",
        text: "",
        icon: icone_seta,
    });

    return (
        <>
            <main>
                <section>
                    <NavHome logo_image={logoImage} logo_text={logoText} />
                    <div className={styles.hero_div}>
                        <div className={styles.content}>
                            <HeroInfo />
                            <HeroFooter />
                        </div>
                    </div>
                </section>
                <section className={styles.solved_problems} logo_image={logoImage} logo_text={logoText}>
                    <h1 className={styles.main_title}>PROBLEMAS RESOLVIDOS PELA ARCHFACTS</h1>
                    <div className={styles.content_area}>
                        <div className={styles.problems_box_div}>
                            <VerticalMenu setInfoBoxData={setInfoBoxData}/>
                        </div>
                        <div className={styles.info_box_div}>
                            <InfoBox icon={infoBoxData.icon}
                                title={infoBoxData.title}
                                text={infoBoxData.text}>
                            </InfoBox>
                        </div>
                    </div>
                </section>
                <section className={styles.benefits}>
                    <h1 className={styles.main_title}>POR QUÊ USAR A NOSSA SOLUÇÃO?</h1>
                    <div className={styles.content_area}>
                        <div className={styles.benefit_div}>
                            <InterestBox title="Tenha uma organização interativa"
                                text="Através de nossa plataforma de gerenciamento, torne a construção do projeto do seu serviço oferecido mais flexível e mais adequada ao seu cliente trabalhando diretamente com ele para atender a sua necessidade!">
                            </InterestBox>
                        </div>
                        <div className={styles.slider_div}>
                            <BigCarousel></BigCarousel>
                        </div>
                    </div>
                </section>
                <section className={styles.plataform_profiles}>
                    <h1 className={styles.main_title}>CONEHÇA OS PERFIS DE NOSSA PLATAFORMA</h1>
                    <div className={styles.content_area}>
                        <div className={styles.profiles}>
                            <Profile
                                title="PRESTADOR DE SERVIÇO"
                                subtitle="Acesso ao serviço de gestão de negócio"
                                benefit1="Gerenciamento do negócio"
                                benefit2="Página exclusiva para seus clientes"
                                benefit3="Trabalho em conjunto com funcionário"
                                benefit4="Insights sobre o seu negócio">
                            </Profile>
                            <Profile
                                title="EMPREGADO"
                                subtitle="Acesso em conjunto ao serviço de gestão de negócio"
                                benefit1="Colaboração no gerenciamento"
                                benefit2=""
                                benefit3=""
                                benefit4="">
                            </Profile>
                            <Profile
                                title="CLIENTE"
                                subtitle="Acesso a página de empresas"
                                benefit1="Solicitar um serviço de uma empresa"
                                benefit2="Contato com prestador por chamado"
                                benefit3="Acompanhamento do serviço"
                                benefit4="Acesso a X4">
                            </Profile>
                        </div>
                    </div>
                </section>
                <section className={styles.contact_div}>
                    <h1 className={styles.main_title}>ENTRE EM CONTATO</h1>
                    <h1 className={styles.main_title}>Caso tenha dúvidas, preencha o formulário e entre em contato conosco!</h1>
                    <div className={styles.content_area}>
                        <Contact></Contact>
                    </div>
                </section>
                <footer className={styles.main_footer}>
                    <MainFooter></MainFooter>
                </footer>
            </main>
        </>
    )
}


export default Home