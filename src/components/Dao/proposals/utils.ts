export const getProposalStatus = (endingDate) => {
  let date = new Date();
  const startTime = Math.floor(date?.getTime());
  const givenEndDate = new Date(endingDate);
  const endTime = new Date(
    givenEndDate.getTime() - givenEndDate.getTimezoneOffset() * 60000
  ).getTime();
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
