import moment from "moment-timezone";

const ConvertLocalFormat = (date: any, isLocal: boolean = false) => {
  const userTimeZone = moment.tz.guess();
  if (isLocal) {
    return moment(date).format("DD-MM-YYYY hh:mm A");
  } else {
    const localTime = moment.utc(date).tz(userTimeZone).format("DD-MM-YYYY hh:mm A");
    return localTime;
  }
};
export default ConvertLocalFormat;
