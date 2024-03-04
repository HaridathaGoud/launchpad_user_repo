const timeUnits = [
  { unit: "week", divisor: 1000 * 60 * 60 * 24 * 7 },
  { unit: "day", divisor: 1000 * 60 * 60 * 24 },
  { unit: "hour", divisor: 1000 * 60 * 60 },
  { unit: "minute", divisor: 1000 * 60 },
];

export const getProposalStatus = (startingDate, endingDate) => {
  let date = new Date();
  const currentTime = Math.floor(date?.getTime());
  const givenStartDate = new Date(startingDate);
  const givenEndDate = new Date(endingDate);

  const startTime = new Date(
    givenStartDate.getTime() - givenStartDate.getTimezoneOffset() * 60000
  ).getTime();
  const endTime = new Date(
    givenEndDate.getTime() - givenEndDate.getTimezoneOffset() * 60000
  ).getTime();

  if (currentTime < startTime) {
    const difference = startTime - currentTime;
    let timeDifference = "Starts in";

    for (const { unit, divisor } of timeUnits) {
      const unitDifference = Math.floor(difference / divisor);
      if (unitDifference > 0) {
        timeDifference +=
          " " + unitDifference + " " + unit + (unitDifference > 1 ? "s" : "");
        break;
      }
    }
    return timeDifference;
  }

  if (currentTime > endTime) {
    return "Ended";
  }

  const difference = endTime - currentTime;
  let timeDifference = "Ends in";

  if (difference === 0) {
    timeDifference = "Ended";
  } else {
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

