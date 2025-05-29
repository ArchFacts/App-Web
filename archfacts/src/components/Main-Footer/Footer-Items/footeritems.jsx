import React from "react";
import styles from './footeritems.module.css'

const FooterItems = ({ icon1, icon2, icon3, icon4, title, item1, item2, item3, item4 }) => {
    return (
        <div className={styles.items_content}>
            <ul className={styles.items_list}>
                <p className={styles.item_title}>{title}</p>
                <div className={styles.item_area}>
                    <img src={icon1} alt="" />
                    <li className={styles.item}>{item1}</li>
                </div>
                <div className={styles.item_area}>
                    <img src={icon2} alt="" />
                    <li className={styles.item}>{item2}</li>
                </div>
                <div className={styles.item_area}>
                    <img src={icon3} alt="" />
                    <li className={styles.item}>{item3}</li>
                </div>
                <div className={styles.item_area}>
                    <img src={icon4} alt="" />
                    <li className={styles.item}>{item4}</li>
                </div>
            </ul>
        </div>
    )
}

export default FooterItems