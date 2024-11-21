import React from "react";
import styles from "../Status/status.module.css"

const Status = ({ status }) => {
    return (
        <div className={styles.status}>
            <p>{status}</p>
        </div>
    );
}

export default Status;