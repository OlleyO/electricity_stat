import { useState } from "react";

import styles from "./styles.module.scss";

import BootDropdown from "react-bootstrap/Dropdown";

interface Props {
  options: string[];
  initial: string;
  handleChange?: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ options, initial, handleChange }) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className={styles["dropdown-wrapper"]}>
      <BootDropdown autoClose="outside">
        <BootDropdown.Toggle id="dropdown-basic">
          {selected ? selected : initial}
        </BootDropdown.Toggle>
        <BootDropdown.Menu>
          {options.map((option, index) => (
            <BootDropdown.Item
              key={index}
              onClick={() => {
                setSelected(option);
                handleChange && handleChange(option);
              }}
            >
              {option}
            </BootDropdown.Item>
          ))}
        </BootDropdown.Menu>
      </BootDropdown>
    </div>
  );
};

export default Dropdown;
