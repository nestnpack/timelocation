function getDay(datetime, language) {
  return new Date(datetime).toLocaleString(language, { weekday: 'short' })
}

function getFullDay(datetime, language) {
  return new Date(datetime).toLocaleString(language, { weekday: 'long' })
}

function getDate(datetime) {
  return datetime.split(', ')[0].split('/')[1];
}

function getMonth(datetime) {
  return datetime.split(', ')[0].split('/')[0];
}

function getYear(datetime) {
  datetime = datetime.split(', ')[0].split('/')[2];
  return datetime[2] + datetime[3];
}

function getFullYear(datetime) {
  return datetime.split(', ')[0].split('/')[2];
}

module.exports = {
  getDay,
  getFullDay,
  getDate,
  getMonth,
  getYear,
  getFullYear
};