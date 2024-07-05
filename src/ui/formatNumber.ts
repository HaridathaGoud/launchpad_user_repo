const shortTheNumber = (value: number | string) => {
  value = Number(value);
  if (value < 1000) {
    return value;
  }
  if (value >= 1000 && value < 1000000) {
    return `${Math.floor(value / 1000)}K+`;
  }
  if (value >= 1000000 && value < 1000000000) {
    return `${Math.floor(value / 1000000)}M+`;
  }
  return `${Math.floor(value / 1000000000)}B+`;
};

const numberWithCommas = (value: any, maximumFractionDigits: number = 8) => {
  const valueToConvert = value ? Number(value) : value;
  try {
    const userLocale = navigator.language || "en-US";
    return valueToConvert
      ? valueToConvert.toLocaleString(userLocale, {
          maximumFractionDigits: maximumFractionDigits,
        })
      : valueToConvert;
  } catch (e) {
    return valueToConvert
      ? valueToConvert.toLocaleString("en-US", {
          maximumFractionDigits: maximumFractionDigits,
        })
      : valueToConvert;
  }
};
export { shortTheNumber, numberWithCommas };
