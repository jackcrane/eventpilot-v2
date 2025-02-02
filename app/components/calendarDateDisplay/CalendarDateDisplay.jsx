import styles from "./calendardatedisplay.module.css";
import React from "react";

export const CalendarDateDisplay = ({ month, day, date }) => {
  if (date) {
    return;
  }

  return (
    <div className={styles.container}>
      <span className={styles.month}>{month}</span>
      <span className={styles.day}>{day}</span>
    </div>
  );
};
