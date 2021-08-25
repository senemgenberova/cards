import _ from "lodash";

export const formatDate = (date) => {
  if (_.isEmpty(date)) return "";

  const d = new Date(date);
  let [month, day, year] = [
    "" + (d.getMonth() + 1),
    "" + d.getDate(),
    d.getFullYear(),
  ];

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
};
