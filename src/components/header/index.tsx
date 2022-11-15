import dayjs from "dayjs";

import styles from "./styles.module.scss";

import MenuIcon from "../../../public/menu-icon.svg";
import CloudDrizzle from "../../../public/cloud-drizzle.svg";

import { useEffect, useState } from "react";
import DateShower from "../date-shower";

interface Props {
  temperature: number;
  currentDate: Date;
}

const Header: React.FC<Props> = ({ temperature, currentDate }) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <MenuIcon className={styles["menu-icon"]} />
        <DateShower date={currentDate} />
      </div>
      <div className={styles.right}>
        <CloudDrizzle />
        <div className={styles.temperature}>
          {temperature}
          <span className={styles.celcius}>ºC</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
