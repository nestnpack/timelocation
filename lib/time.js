'use strict';

function getSeconds(datetime) {
  return datetime.split(', ')[1].split(':')[2].split(' ')[0];
}

function getMinutes(datetime) {
  return datetime.split(', ')[1].split(':')[1];
}

function getHours(datetime, format) {
  datetime = datetime.split(', ')[1].split(':')[0];
  
  //if time format 24 hours
  if(format == false) {
    if(datetime < 10) {
      datetime = datetime.split('0')[1];
    }
    return datetime;
  }
  
  //if time format 12 hours
  if(format == true) {
    return datetime;
  }
}

function getFullHours(datetime, format) {
  datetime = datetime.split(', ')[1].split(':')[0];
  
  //if time format 24 hours
  if(format == false) {
    return datetime;
  }
  
  //if time format 12 hours
  if(format == true) {
    if(datetime < 10) {
      datetime = '0' + datetime;
    }
    return datetime;
  }
}

function getPmAm(datetime, format) {
  //if time format 24 hours
  if(format == false) {
    return Error('use getPmAm if time format 12 hours');
  }
  
  //if time format 12 hours
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