
export const formatDate = (inputDate,locale) => {
  let formattedDate;
  const date = new Date(inputDate);
  formattedDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  return formattedDate;
};
