function getSeconds(datetime) {
  return datetime.split(', ')[1].split(':')[2].split(' ')[0];
}

function getMinutes(datetime) {
  return datetime.split(', ')[1].split(':')[1];
}

function getHours(datetime, format) {
  datetime = datetime.split(', ')[1].split(':')[0];
  if(format == false) {
    return datetime.split('0')[1];
  }
  
  if(format === true) {
    return datetime;
  }
}

function getFullHours(datetime, format) {
  datetime = datetime.split(', ')[1].split(':')[0];
  if(format == false) {
    return datetime;
  }
  
  if(format == true) {
    if(datetime < 10) {
      return '0' + datetime;
    }
  }
}

function getPmAm(datetime, format) {
  if(format == true) {
    return datetime.split(', ')[1].split(':')[2].split(' ')[1];
  }
}

module.exports = {
  getSeconds,
  getMinutes,
  getHours,
  getFullHours,
  getPmAm
}