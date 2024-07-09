const shortTheNumber = (
  value: number | string,
  maximumFractionDigits: number = 8
) => {
  value = Number(value);
  if (value < 1000) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: maximumFractionDigits,
    });
  }
  if (value >= 1000 && value < 1000000) {
    if (Math.floor(value % 1000) === 0) {
      return `${numberWithCommas(Math.floor(value / 1000))}K`;
    }
    return `${numberWithCommas(Math.floor(value / 1000))}K+`;
  }
  if (value >= 1000000 && value < 1000000000) {
    if (Math.floor(value % 1000000) === 0) {
      return `${numberWithCommas(Math.floor(value / 1000))}M`;
    }
    return `${numberWithCommas(Math.floor(value / 1000000))}M+`;
  }
  return `${numberWithCommas(Math.floor(value / 1000000000))}B+`;
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
