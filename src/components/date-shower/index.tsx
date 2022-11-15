import styles from "./styles.module.scss";

interface Props {
  date: Date;
}

import dayjs from "dayjs";

const DateShower: React.FC<Props> = ({ date }) => {
  const hoursAndMins = dayjs(date).format("h:mm");
  const amOrPm = dayjs(date).format("A");
  const dayOfWeek = dayjs(date).format("ddd");
  const monthAndDay = dayjs(date).format("MMM D");

  return (
    <div className={styles["date-shower"]}>
      <span className={styles["hours-and-mins"]}>{hoursAndMins}</span>
      <span className={styles["am-or-pm"]}>{amOrPm}</span>
      <div className={styles["day-of-week-and-month-and-day"]}>
        <span className={styles["day-of-week"]}>{dayOfWeek}</span>
        <span className={styles["month-and-day"]}>{monthAndDay}</span>
      </div>
    </div>
  );
};

export default DateShower;
