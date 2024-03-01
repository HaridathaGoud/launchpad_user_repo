export const getProposalStatus = (endingDate) => {
  let localDate1 = new Date();
  let utcDate = localDate1?.toISOString();
  let utcDateObject = new Date(utcDate);
  let startEpochTime = utcDateObject?.getTime();
  const startTime = startEpochTime;
  const endTime = new Date(endingDate).getTime();

  if (startTime > endTime) {
    return "Ended";
  }

  const difference = endTime - startTime;
  let timeDifference = "Ends in";

  if (difference === 0) {
    timeDifference = "Ended";
  } else {
    const timeUnits = [
      { unit: "week", divisor: 1000 * 60 * 60 * 24 * 7 },
      { unit: "day", divisor: 1000 * 60 * 60 * 24 },
      { unit: "hour", divisor: 1000 * 60 * 60 },
      { unit: "minute", divisor: 1000 * 60 },
    ];

    for (const { unit, divisor } of timeUnits) {
      const unitDifference = Math.floor(difference / divisor);
      if (unitDifference > 0) {
        timeDifference +=
          " " + unitDifference + " " + unit + (unitDifference > 1 ? "s" : "");
        break;
      }
    }
  }
  return timeDifference;
};
