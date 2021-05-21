import moment from 'moment';

export const getTimeDate = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('DD/MM/YYYY   hh:mmA');
};

export const getDate = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('DD/MM/YYYY');
};

export const getDate2 = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('DD MMMM, YYYY');
};

export const getDate3 = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('MMM, DD, YYYY');
};

export const getDateFormat = (date = new Date(), format = 'MM/DD/YYYY') => {
  if (!date) {
    return null;
  }
  return moment(date).format(format);
};

export const getTime = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('hh:mmA');
};

export const getTimeRound = (date = new Date()) => {
  if (!date) {
    return null;
  }
  return moment(date).format('hh:00A');
};

export const checkHour = (date1 = new Date(), date2 = new Date()) => {
  const diffTime = moment(date1).diff(date2, 'hours');
  return (
    diffTime <= 1 &&
    diffTime >= -1 &&
    moment(date1).hours() === moment(date2).hours()
  );
};
export const checkMinute = (date1 = new Date(), date2 = new Date()) => {
  const diffTime = moment(date1).diff(date2, 'minutes');
  return (
    diffTime <= 1 &&
    diffTime >= -1 &&
    moment(date1).minutes() === moment(date2).minutes()
  );
};
