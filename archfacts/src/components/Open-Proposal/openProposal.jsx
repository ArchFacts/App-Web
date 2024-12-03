import React from "react";
import styles from './openProposal.module.css';
import right_icon from '../../utils/assets/right_check.svg';
import wrong_icon from '../../utils/assets/wrong_check.svg';
import download_icon from '../../utils/assets/download.svg';

const OpenProposal = ({ solicitante, titulo, onClick }) => {
    const handleDownload = (event) => {
        event.stopPropagation();

        const csvContent = [ 
            ["SOLICITANTE", "TITULO"],
            [solicitante, titulo] 
        ]
            .map(row => row.join(";")) 
            .join("\n"); 
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `proposta-${solicitante}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.content} onClick={onClick}>
            <span><p>{solicitante}</p></span>
            <span><p>{titulo}</p></span>
            <span>
                <img
                    className={styles.img}
                    src={download_icon}
                    alt="Baixar proposta"
                    width={60}
                    height={60}
                    onClick={handleDownload}
                />
            </span>
            <span className={styles.aceitarRecusar}>
                <img className={styles.img} src={right_icon} alt=""
                    width={60}
                    height={60} />
                <img className={styles.img} src={wrong_icon} alt=""
                    width={60}
                    height={60} />
            </span>
        </div>
    );
};

export default OpenProposal;