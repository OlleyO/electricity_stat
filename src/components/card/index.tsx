import styles from "./styles.module.scss";

import AccountIcon from "../../../public/account-icon.svg";
import SettingsIcon from "../../../public/settings-icon.svg";
import MessageIcon from "../../../public/messages-icon.svg";
import TariffIcon from "../../../public/tariff-icon.svg";
import GasIcon from "../../../public/gas-icon.svg";
import ElectricIcon from "../../../public/electric-icon.svg";
import DotsIcon from "../../../public/dots-icon.svg";
import Dropdown from "./dropdown";
import Mark from "../../../public/mark.svg";

import IconArrowTopRight from "../../../public/arrow-top-right.svg";
import MonthlyIcon from "../../../public/monthly-icon.svg";
import TotalIcon from "../../../public/total-icon.svg";
import classNames from "classnames";

import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Account, Message, Tariff, TypeHelper, Usage } from "../../core/types";
import {
  CartesianGrid,
  Line,
  LineChart,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MessageComponent from "../message";
import Range from "../range";
import Switch from "../switch";
import { getQuarterInfo } from "../../core/utils";

type CardData = Usage | Message[] | Tariff | Account;

interface Props {
  type:
    | "gas-usage"
    | "electric-usage"
    | "messages"
    | "tariff"
    | "account"
    | "settings";
  title: string;

  data?: CardData;

  currentDate?: Date;

  wrapperClassName: string;

  currency: "Euro" | "Dollar" | "Pound";
  onCurrencyChange: (value: "Dollar" | "Euro" | "Pound") => void;
}

const Card: React.FC<Props> = ({
  type,
  title,
  wrapperClassName,
  data,
  currentDate,
  currency,
  onCurrencyChange,
}) => {
  const options = ["Monthly", "Today"];
  const currencies = ["Dollar", "Euro", "Pound"];

  const sign = currency === "Dollar" ? "$" : currency === "Euro" ? "€" : "£";

  const renderIcon = () => {
    switch (type) {
      case "gas-usage":
        return <GasIcon />;
      case "electric-usage":
        return <ElectricIcon />;
      case "messages":
        return <MessageIcon />;
      case "tariff":
        return <TariffIcon />;
      case "account":
        return <AccountIcon />;
      case "settings":
        return <SettingsIcon />;
    }
  };

  const renderGraph = () => {
    if (TypeHelper.isUsage(data)) {
      const lineCommon = {
        dot: false,
        strokeWidth: 2,
      };

      const CustomTooltip = ({ active, payload }) => {
        const unit = type === "electric-usage" ? "kWh" : "litres";

        if (active && payload && payload.length) {
          return (
            <div className={styles.tooltip}>
              <div className={styles["tooltip-part"]}>
                <span>Target amount:</span>
                <span>{`${payload[0].value} ${unit}`}</span>
              </div>
              <div className={styles["tooltip-part"]}>
                <span>Current usage:</span>
                <span>
                  {`${payload[1].value}`} {unit}
                </span>
              </div>
            </div>
          );
        }

        return null;
      };

      return (
        <div className={styles["graph-container"]}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.graphData}>
              <CartesianGrid />
              <XAxis axisLine={false} tickLine={false} dataKey="date" />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, (max: number) => Math.floor(max * 1.2)]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey="targetAmount"
                stroke="var( --target-amount-fill"
                {...lineCommon}
              />
              <Line
                dataKey="currentUsage"
                stroke="var(--current-usage-fill)"
                {...lineCommon}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  const renderSettings = () => {
    return (
      <div className={styles["settings-container"]}>
        <div className={styles.row}>
          <span className={styles["setting-name"]}>Screen brightness</span>
          <Range />
        </div>
        <div className={styles.row}>
          <span className={styles["setting-name"]}>Sound volume</span>
          <Range />
        </div>
        <div className={styles.row}>
          <span className={styles["setting-name"]}>Currency</span>
          <Dropdown
            options={currencies}
            initial={currencies[0]}
            handleChange={onCurrencyChange}
          />
        </div>
        <div className={styles.row}>
          <span className={styles["setting-name"]}>Weather</span>
          <Switch />
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    if (TypeHelper.isArrayOfMessages(data)) {
      return (
        <div className={styles["messages-container"]}>
          {data.map((message, index) => (
            <MessageComponent key={index} data={message} />
          ))}
        </div>
      );
    }
  };

  const renderTariff = () => {
    const dateInfo = getQuarterInfo(currentDate || new Date());

    return (
      TypeHelper.isTariff(data) && (
        <div className={styles["tariff-container"]}>
          <div className={styles.subtitle}>
            Current Quarter ({dateInfo.untilStart} - {dateInfo.untilEnd})
          </div>
          <div className={styles["tariff-content"]}>
            <div className={styles["left-part"]}>
              <div>
                <div className={styles["tariff-total"]}>
                  {sign}
                  {data.price}
                </div>
                <div
                  className={classNames(
                    styles["tariff-change"],
                    data.priceChange > 0 ? styles.grow : styles.fall
                  )}
                >
                  <IconArrowTopRight />
                  {sign}250
                </div>
              </div>

              <div className={styles["progress-container"]}>
                <div>
                  <div className={styles.edge}>{dateInfo.start}</div>
                  <div className={styles.edge}>{dateInfo.end}</div>
                </div>
                <div className={styles["progress-bar"]}>
                  <div
                    className={styles["progress-bar-fill"]}
                    style={{
                      width: `${100 - dateInfo.percent}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles["vertical-separator"]} />
            <div className={styles["right-part"]}>
              <CircularProgressbar
                className={styles["progress-round"]}
                value={100 - dateInfo.percent}
                text={`${dateInfo.daysLeft} days`}
                styles={buildStyles({
                  trailColor: "var(--current-usage-stroke)",
                })}
              />
              <div className={styles["time-left"]}>
                Until End of {dateInfo.untilEndOf}
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  const renderAccount = () => {
    return (
      TypeHelper.isAccount(data) && (
        <div className={styles["account-container"]}>
          <div className={styles.subtitle}>Current Balance</div>
          <div className={styles["balancemeter-container"]}>
            <CircularProgressbarWithChildren
              className={styles.balancemeter}
              value={data.balance}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "round",
                trailColor: "var(--current-usage-stroke)",
              })}
            >
              <div className={styles["inner-text"]}>
                {sign} {data.balance}
              </div>
              <div
                className={styles["marker-container"]}
                style={{
                  transform: `rotate(${-85 + (data.balance / 100) * 270}deg)`,
                }}
              >
                <Mark className={styles.mark} />
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      )
    );
  };

  const renderCardHead = () => {
    switch (type) {
      case "gas-usage":
      case "electric-usage":
        return (
          <>
            <div className={styles.head}>
              <div className={styles["left"]}>
                {renderIcon()}
                <div className={styles["title"]}>{title}</div>
              </div>
              <div className={styles["right"]}>
                <Dropdown options={options} initial={"Period"} />
                <DotsIcon className={styles.dots} />
              </div>
            </div>

            <div className={styles.subhead}>
              <div className={styles.legend}>
                <div className={styles["target-amount"]}>Target Amount</div>
                <div className={styles["current-usage"]}>Current Usage</div>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <MonthlyIcon />
                  <span className={styles.label}>Monthly</span>
                  <div className={styles["value-container"]}>
                    <span className={styles.value}>
                      {TypeHelper.isUsage(data) && data.monthly}
                    </span>
                    <span className={styles.unit}>
                      {type === "electric-usage" ? "kWh" : "litre"}{" "}
                    </span>
                  </div>
                </div>
                <div className={styles.stat}>
                  <TotalIcon />
                  <span className={styles.label}>Total</span>
                  <div className={styles["value-container"]}>
                    <span className={styles.unit}>{sign}</span>
                    <span className={styles.value}>
                      {TypeHelper.isUsage(data) && data.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "messages":
      case "account":
      case "settings":
      case "tariff":
        return (
          <div className={styles.head}>
            <div className={styles["left"]}>
              {renderIcon()}
              <div className={styles["title"]}>{title}</div>
            </div>
            <div className={styles["right"]}>
              <DotsIcon className={styles.dots} />
            </div>
          </div>
        );
    }
  };

  const renderCardContent = () => {
    switch (type) {
      case "gas-usage":
      case "electric-usage":
        return renderGraph();

      case "messages":
        return renderMessages();

      case "tariff":
        return renderTariff();
      case "account":
        return renderAccount();
      case "settings":
        return renderSettings();
    }
  };

  return (
    <div className={wrapperClassName}>
      <div className={styles.card}>
        <div className={classNames(styles.main, styles[type])}>
          {renderCardHead()}
          {renderCardContent()}
        </div>
      </div>
      <svg className={styles.hide} style={{ height: 0 }}>
        <defs>
          <linearGradient
            id="gradient-primary-fill"
            x1="0"
            y1="0"
            x2="800"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90deg)"
          >
            <stop offset="0" stopColor="#4aceb7" />

            {/* <stop offset="0.09090909090909091" stopColor="#43cdbc" /> */}

            <stop offset="0.18181818181818182" stopColor="#44c4e1" />

            <stop offset="0.2727272727272727" stopColor="#3dcdc2" />

            <stop offset="0.36363636363636365" stopColor="#35c8d8" />

            <stop offset="0.4545454545454546" stopColor="#33c9d4" />

            <stop offset="0.5454545454545454" stopColor="#33cad0" />

            <stop offset="0.6363636363636364" stopColor="#35cbcb" />

            <stop offset="0.7272727272727273" stopColor="#38ccc7" />

            <stop offset="0.8181818181818182" stopColor="#39c6db" />

            <stop offset="0.9090909090909092" stopColor="#3ec5de" />

            <stop offset="1" stopColor="#4bc2e3" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.hide}
        style={{ height: 0 }}
      >
        <defs>
          <linearGradient
            id="gradient-fill"
            x1="0"
            y1="0"
            x2="800"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#4bc2e3" />

            <stop offset="0.09090909090909091" stopColor="#44c4e1" />

            <stop offset="0.18181818181818182" stopColor="#3ec5de" />

            <stop offset="0.2727272727272727" stopColor="#39c6db" />

            <stop offset="0.36363636363636365" stopColor="#35c8d8" />

            <stop offset="0.4545454545454546" stopColor="#33c9d4" />

            <stop offset="0.5454545454545454" stopColor="#33cad0" />

            <stop offset="0.6363636363636364" stopColor="#35cbcb" />

            <stop offset="0.7272727272727273" stopColor="#38ccc7" />

            <stop offset="0.8181818181818182" stopColor="#3dcdc2" />

            <stop offset="0.9090909090909092" stopColor="#43cdbc" />

            <stop offset="1" stopColor="#4aceb7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Card;
