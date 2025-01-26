const savedCurrency = JSON.parse(localStorage.getItem("currency"));
const savedLocale = JSON.parse(localStorage.getItem("locale"));
const savedColorTheme = JSON.parse(localStorage.getItem("colorTheme"));
const savedFontTheme = JSON.parse(localStorage.getItem("fontTheme"));
const savedLanguage = JSON.parse(localStorage.getItem("language"));

export const initialSettings = {
  currentTab: "currency",
  currency: savedCurrency || "EUR",
  locale: savedLocale || "fi-FI",
  language: savedLanguage || "en",
  colorTheme: savedColorTheme || "dark",
  fontTheme: savedFontTheme || '"League Spartan", sans-serif',
};
