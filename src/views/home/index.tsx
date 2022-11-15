import Card from "../../components/card";
import Header from "../../components/header";
import { Account, Message, Tariff, Usage } from "../../core/types";
import styles from "./styles.module.scss";

interface Props {
  temperature: number;
  gasUsage: Usage;
  electricUsage: Usage;
  messages: Message[];
  tariff: Tariff;
  account: Account;
  currentDate: Date;
  onCurrencyChange: (value: "Dollar" | "Euro" | "Pound") => void;
  currency: "Dollar" | "Euro" | "Pound";
}

const HomeView: React.FC<Props> = ({
  temperature,
  gasUsage,
  electricUsage,
  messages,
  tariff,
  account,
  currentDate,
  onCurrencyChange,
  currency,
}) => {
  return (
    <div className={styles.home}>
      <Header temperature={temperature} currentDate={currentDate} />
      <main className={styles.main}>
        <Card
          title="Gas usage"
          type="gas-usage"
          wrapperClassName={styles["card-gas"]}
          data={gasUsage}
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
        <Card
          title="Electric usage"
          type="electric-usage"
          wrapperClassName={styles["card-electric"]}
          data={electricUsage}
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
        <Card
          title="Messages"
          type="messages"
          wrapperClassName={styles["card-message"]}
          data={messages}
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />

        <Card
          title="Tariff"
          type="tariff"
          wrapperClassName={styles["card-tariff"]}
          data={tariff}
          currentDate={currentDate}
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
        <Card
          title="Account"
          type="account"
          wrapperClassName={styles["card-account"]}
          data={account}
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
        <Card
          title="Settings"
          type="settings"
          wrapperClassName={styles["card-settings"]}
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
      </main>
    </div>
  );
};

export default HomeView;
