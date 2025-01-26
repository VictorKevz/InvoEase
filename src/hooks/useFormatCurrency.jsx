import { useContext } from "react";
import { DataContext } from "../App";

export const useFormatCurrency = () => {
  const { settings } = useContext(DataContext);

  return (amount) =>
    new Intl.NumberFormat(settings?.locale, {
      style: "currency",
      currency: settings?.currency,
    }).format(amount);
};
