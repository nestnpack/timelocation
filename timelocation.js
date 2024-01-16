/*
MIT License
Copyright (c) 2024 Nest Packages

 ---------- Timelocation V1.0.1 ---------- 
*/

'use strict';

const timelocation = (function() {
  const time = {
    getSeconds: (datetime) => {
      return datetime.split(', ')[1].split(':')[2].split(' ')[0];
    },
    getMinutes: (datetime) => {
      return datetime.split(', ')[1].split(':')[1];
    },
    getHours: (datetime, format) => {
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
    },
    getFullHours: (datetime, format) => {
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
    },
    getPmAm: (datetime, format) => {
      //if time format 24 hours
      if(format == false) {
        throw Error('use getPmAm if time format 12 hours');
      }
      
      //if time format 12 hours
      if(format == true) {
        return datetime.split(', ')[1].split(':')[2].split(' ')[1];
      }
    }
  }
  
  const calendar = {
    getDay: (datetime, language) => {
      return new Date(datetime).toLocaleString(language, { weekday: 'short' })
    },
    getFullDay: (datetime, language) => {
      return new Date(datetime).toLocaleString(language, { weekday: 'long' })
    },
    getDate: (datetime) => {
      return datetime.split(', ')[0].split('/')[1];
    },
    getMonth: (datetime) => {
      return datetime.split(', ')[0].split('/')[0];
    },
    getYear: (datetime) => {
      datetime = datetime.split(', ')[0].split('/')[2];
      return datetime[2] + datetime[3];
    },
    getFullYear: (datetime) => {
      return datetime.split(', ')[0].split('/')[2];
    }
  }
  
  function setTimezone(timezone, format, language, type) {
    //if format is undefined
    if(typeof format === 'undefined') {
      throw Error('time format cannot be undefined');
    }
    
    //if language is undefined
    if(typeof language === 'undefined') {
      throw Error('language cannot be undefined. use example en-US for language english');
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
      throw Error('time format invalid. use format 12 hours or 24 hours');
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
      throw Error('area zone cannot be undefined');
    }
    
    //if input is string
    if(typeof area === 'String') {
      if(area.search('/') >= 0) {
        //run function
        return setTimezone(area, format, language, 'area');
      }
    }
    
    //throw Error
    throw Error('Area format invalid');
  }
  
  function setGmt(gmt, format, language) {
    //if gmt is undefined
    if(typeof gmt === 'undefined') {
      throw Error('gmt zone cannot be undefined');
    }
    
    //if input is string
    if(typeof gmt === 'String') {
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
    }
    
    //throw Error
    throw Error('Gmt format invalid');
  }
  
  function setLocal(format, language) {
    return setTimezone('', format, language, 'local')
  }
  
  const timelocation = {
    setGmt,
    setArea,
    setLocal
  }
  
  return timelocation;
})();