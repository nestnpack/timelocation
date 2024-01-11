# Timelocation

An npm package that can easily retrieve time, day, date and other data according to the timezone you specify

## Installation
Install with npm
```console
npm install timelocation
```

or connect with CDN
```text
https://www.unpkg.com/timelocation@latest/timelocation.js
```

## Import
With require
```javascript
const timelocation = require('timelocation')
```

With Tag Script Html
```html
<script src="./node_modules/timelocation/timelocation.js"></script>
```

Connect with CDN
```html
<script src="https://www.unpkg.com/timelocation@latest/timelocation.js"></script>
```

## Usage
### Initilization
First of all, you have to define the timezone first
```javascript
const test1 = timelocation.setArea("Asia/Jakarta", 24, "en-US")
const test2 = timelocation.setGmt("GMT+7", 12, "en-US")

//if you use getLocal then the timezone will follow your device
const test2 = timezonejs.setLocal(24, "en-US")
```
When defining a timezone, use one of these methods

Each requires parameters

First parameter: (location), does not apply to getLocal

Second parameter: (time format), you can choose the time format 12 hours or 24 hours

Last parameter: (language), you must enter the language to organize the day

#### Example Usage
```javascript
test1.getDay() //return: Sun

//use getFullDay to return full day
test1.getFullDay() //return: Sunday

test1.getDate() //return: 7
test1.getMonth() //return: 1
test1.getYear() //return: 24

//use getFullYear to return full year
test1.getFullYear() //return: 2024


test1.getSeconds() //return: 10
test1.getMinutes() //return: 26
test1.getHours() //return: 4

//use getFullHours to add the number 0 when it is below 10, for example 04
test1.getFullHours() //return: 04

test1.getPmAm() //Use this if the time format is 12 hours to display PM or AM
```