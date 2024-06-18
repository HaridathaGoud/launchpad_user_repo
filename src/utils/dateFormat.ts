import moment from "moment-timezone";

// const ConvertLocalFormat = (item: any) => {
//   if (!item) return null;
//   const localDateTime = moment(item).add(5.5, 'hours');
//   return localDateTime.format("DD-MM-YYYY hh:mm A");
// }

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
