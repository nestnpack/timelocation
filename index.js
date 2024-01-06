/*
MIT License
Copyright (c) 2024 Nest Packages

 ---------- Timezonejs V1.0.0 ---------- 
*/
const calendar = require('./lib/calendar.js');
const time = require('./lib/time.js');

function setTimezone(timezone, format, language, type) {
  //if format is undefined
  if(typeof format === 'undefined') {
    return Error('time format cannot be undefined');
  }
  
  //if language is undefined
  if(typeof language === 'undefined') {
    return Error('language cannot be undefined. use example en-US for language english');
  }
  
  //if format is number
  if(typeof format === 'number') {
    //if time format 24 hours
    if(format === 24) {
      format = false;
    }
    
    //if time format 12 hours
    if(format === 12) {
      format = true;
    }
  } else {
    return Error('time format invalid. use format 12 hours or 24 hours');
  }
  
  let options;
  //check type
  if(type == 'area' || type == 'gmt') {
    options = { timeZone: timezone, hour12: format }
  } else if (type == 'local') {
    options = { hour12: format }
  }
  
  //set
  const datetime = new Date().toLocaleString("en-US", options);
  
  const result = {
    //calendar
    getDay: () => calendar.getDay(datetime, language),
    getFullDay: () => calendar.getFullDay(datetime, language),
    getDate: () => calendar.getDate(datetime),
    getMonth: () => calendar.getMonth(datetime),
    getYear: () => calendar.getYear(datetime),
    getFullYear: () => calendar.getFullYear(datetime),
    
    //time
    getSeconds: () => time.getSeconds(datetime),
    getMinutes: () => time.getMinutes(datetime),
    getHours: () => time.getHours(datetime, format),
    getFullHours: () => time.getFullHours(datetime, format),
    getPmAm: () => time.getPmAm(datetime, format)
  }
  
  return result;
}

function setArea(area, format, language) {
  //if area location is undefined
  if(typeof area === 'undefined') {
    return Error('area zone cannot be undefined');
  }
  
  //vrify input
  if(area.search('/') >= 0) {
    //run function
    return setTimezone(area, format, language, 'area');
  }
  
  //return error
  return Error('Area format invalid');
}

function setGmt(gmt, format, language) {
  //if gmt is undefined
  if(typeof gmt === 'undefined') {
    return Error('gmt zone cannot be undefined');
  }
  
  //verify input
  if(gmt.search('GMT') >= 0) {
    //replacing
    if(gmt[3] == '-') {
      gmt = gmt.replace('-', '+');
    } else if(gmt[3] == '+') {
      gmt = gmt.replace('+', '-');
    }
    gmt = `Etc/${gmt}`;
    
    //run function
    return setTimezone(gmt, format, language, 'gmt');
  }
  
  //return error
  return Error('GMT format invalid');
}

function setLocal(format, language) {
  return setTimezone('', format, language, 'local')
}

module.exports = { setGmt, setArea, setLocal };