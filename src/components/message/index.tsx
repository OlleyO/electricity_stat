import dayjs from "dayjs";
import { Message as MessageType } from "../../core/types";
import styles from "./styles.module.scss";

import IconRight from "../../../public/arrow-right.svg";

interface Props {
  data: MessageType;
}

const Message: React.FC<Props> = ({ data }) => {
  const monthAndDay = dayjs(data.date).format("MMMM D");

  const time = dayjs(data.date).format("hh.m a");

  return (
    <div className={styles.message}>
      <div className={styles.body}>
        <div className={styles.content}>{data.message}</div>
        <div className={styles.date}>
          <span>{monthAndDay},</span>
          <span>{time}</span>
        </div>
      </div>

      <IconRight className={styles.arrow} />
    </div>
  );
};

export default Message;
