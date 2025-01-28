export const prefillClientCompany = (data) => {
  const updatedSection = {};

  Object.keys(data).forEach((key) => {
    updatedSection[key] = {
      value: data?.[key] || "",
      valid: true,
      errorMessage: "",
    };
  });
  return updatedSection;
};

export const createClientCompany = (data) => {
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = data[key]?.value;
    return acc;
  }, {});
};
