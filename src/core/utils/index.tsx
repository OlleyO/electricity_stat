import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getQuarterInfo = (strDate: Date) => {
  const date = dayjs(strDate);
  const start = date.startOf("quarter");
  const end = date.endOf("quarter");
  const daysLeft = end.diff(date, "day");
  const allDays = end.diff(start, "day");

  return {
    start: start.format("MMM D"),
    end: end.format("MMM D"),
    untilEnd: end.format("MMM"),
    untilStart: start.format("MMM"),
    untilEndOf: end.format("MMMM"),
    daysLeft,
    percent: Math.floor((daysLeft / allDays) * 100),
  };
};
