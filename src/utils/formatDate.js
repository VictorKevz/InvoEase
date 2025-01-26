
export const formatDate = (inputDate) => {
  let formattedDate;
  const date = new Date(inputDate);
  formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  return formattedDate;
};
