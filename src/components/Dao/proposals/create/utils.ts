export const getEpochFormat = (date: any) => {
  const dateTimeUtc = new Date(date).toUTCString();
  const epochStartTime = Math.floor(new Date(dateTimeUtc).getTime() / 1000);
  return epochStartTime;
};


export const convertTo24HourFormat = (time) => {
  const [timeStr, amPm] = time.split(" ");
  const [hours, minutes] = timeStr.split(":");
  let hours24 = parseInt(hours, 10);

  if (amPm?.toLowerCase() === "pm" && hours24 !== 12) {
    hours24 += 12;
  } else if (amPm?.toLowerCase() === "am" && hours24 === 12) {
    hours24 = 0;
  }

  return hours24 * 60 + parseInt(minutes, 10);
};
