import type { NextPage } from "next";
import { months } from "../core/constants";
import { Account, GraphData, Message, Tariff, Usage } from "../core/types";
import HomeView from "../views/home";

import { generateRandomNumber } from "../core/utils/index";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currency, setCurrency] = useState<"Dollar" | "Euro" | "Pound">(
    "Dollar"
  );

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleCurrenctChange = (value: "Dollar" | "Euro" | "Pound") => {
    setCurrency(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  });

  return (
    data && (
      <HomeView
        gasUsage={data.gasUsage}
        electricUsage={data.electricUsage}
        temperature={data.temperature}
        account={data.account}
        messages={data.messages}
        tariff={data.tariff}
        currentDate={currentDate}
        currency={data.currency}
        onCurrencyChange={handleCurrenctChange}
      />
    )
  );
};

export default Home;
