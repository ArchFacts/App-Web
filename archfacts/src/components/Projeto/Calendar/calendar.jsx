import React from "react";
import styles from "../Calendar/calendar.module.css"
import calendar_icon from "../../../utils/assets/calendar.svg"

const Calendar = ({date}) => {
    return (
        <div className={styles.calendar_area}>
            <img src={calendar_icon} alt="Ícone de calendário" 
            width={40}
            height={40}/>
            <p>{date}</p>
        </div>
    );
}

export default Calendar;