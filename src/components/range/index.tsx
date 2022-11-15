import classNames from "classnames";
import RangeSlider from "react-bootstrap-range-slider";
import { FormRangeProps } from "react-bootstrap/esm/FormRange";

import styles from "./styles.module.scss";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { useState } from "react";

interface Props extends FormRangeProps {
  wrapperClassName?: string;
}

const Range: React.FC<Props> = ({ wrapperClassName, className, ...props }) => {
  const [value, setValue] = useState(0);

  return (
    <div className={classNames(styles.range, wrapperClassName)}>
      <RangeSlider
        value={value}
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        tooltip={false}
      />
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 2px)",
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--primary-gradient)",
          borderRadius: "5px",
          width: `${value}%`,
          height: "4px",
        }}
      />
    </div>
  );
};

export default Range;
