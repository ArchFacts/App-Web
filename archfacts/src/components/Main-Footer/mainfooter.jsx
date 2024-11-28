import React from "react";
import styles from './mainfooter.module.css'
import FooterItems from "./Footer-Items/footeritems";
import instagramIcon from '../../utils/assets/instagram.svg'
import facebookIcon from '../../utils/assets/facebook.svg'
import linkedinIcon from '../../utils/assets/linkedin.svg'

const MainFooter = () => {
    return (
        <div className={styles.footer_area}>
            <FooterItems title={"Navegue:"}
                item1={"Home"}
                item2={"Problemas resolvidos"}
                item3={"Por que usar nossa solução?"}
                item4={"Conheça os perfis"}>
            </FooterItems>

            <FooterItems title={"Está interessado?"}
                item1={"Fale conosco"}
                item2={"Faça o seu cadastro"}
                item3={null}
                item4={null}>
            </FooterItems>

            <FooterItems title={"Redes sociais:"}
                item1={"ArchFacts"}
                item2={"ArchFacts"}
                item3={"ArchFacts"}
                icon1={linkedinIcon}
                icon2={instagramIcon}
                icon3={facebookIcon}>
            </FooterItems>

            <div className={styles.rights}>
                <p>© 2024 ArchFacts all rights reserved.</p>
            </div>
        </div>
    )
}

export default MainFooter