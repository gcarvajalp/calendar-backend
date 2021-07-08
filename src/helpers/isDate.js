import moment from 'moment';


export const isDate = (value) => {

  if (!value) {
    return false
  }

  const fecha = moment(value);
  if (!fecha.isValid()) {
    return false
  }

  return true;
}