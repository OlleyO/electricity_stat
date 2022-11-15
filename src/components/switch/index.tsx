import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./styles.module.scss";

const Switch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.switch}>
      <input
        id="switch"
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="switch" className={styles.label}>
        <span className={styles.button} />
      </label>
    </div>
  );
};

export default Switch;
