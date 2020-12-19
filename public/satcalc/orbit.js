/* global satellite */
import { satellite } from "./satelites.js";
//var satellite = new CalcSat();
var NUM_SEGS;

//var data = fs.readFileSync("./TLE.json");
var Period = function (satCache) {
  return (2 * Math.PI) / satCache.no;
};
var CalcOrbit = function (satCache) {
  NUM_SEGS = 255;
  var sat = satellite();

  var nowDate = new Date();
  var nowJ = jday(
    nowDate.getUTCFullYear(),
    nowDate.getUTCMonth() + 1,
    nowDate.getUTCDate(),
    nowDate.getUTCHours(),
    nowDate.getUTCMinutes(),
    nowDate.getUTCSeconds()
  );
  nowJ += nowDate.getUTCMilliseconds() * 1.15741e-8; //days per millisecond
  var now = (nowJ - satCache.jdsatepoch) * 1440.0; //in minutes

  var period = (2 * Math.PI) / satCache.no; //convert rads/min to min
  var timeslice = period / NUM_SEGS;
  var totalpoints = new Array();
  for (var i = 0; i < NUM_SEGS + 1; i++) {
    var t = now + i * timeslice;
    var p = sat.sgp4(satCache, t).position;
    try {
      totalpoints.push(p);
    } catch (ex) {
      totalpoints.push(p);
    }
  }
  return totalpoints;
};
var CalculateTime = function (satData) {
  var nowDate = new Date();
  var nowJ = jday(
    nowDate.getUTCFullYear(),
    nowDate.getUTCMonth() + 1,
    nowDate.getUTCDate(),
    nowDate.getUTCHours(),
    nowDate.getUTCMinutes(),
    nowDate.getUTCSeconds()
  );
  nowJ += nowDate.getUTCMilliseconds() * 1.15741e-8; //days per millisecond
  var now = (nowJ - satData.jdsatepoch) * 1440.0; //in minutes
  return now;
};
var ToLinesSatrec = function (l1, l2) {
  var sat = satellite();
  return sat.twoline2satrec(l1, l2);
};
var Sgp4 = function (satCache, t) {
  var sat = satellite();
  var params = sat.sgp4(satCache, t);
  return { position: params.position, velocity: params.velocity };
};
var jday = function (year, mon, day, hr, minute, sec) {
  //from satellite.js
  "use strict";
  return (
    367.0 * year -
    Math.floor(7 * (year + Math.floor((mon + 9) / 12.0)) * 0.25) +
    Math.floor((275 * mon) / 9.0) +
    day +
    1721013.5 +
    ((sec / 60.0 + minute) / 60.0 + hr) / 24.0 //  ut in days
    //#  - 0.5*sgn(100.0*year + mon - 190002.5) + 0.5;
  );
};
export { CalcOrbit, Sgp4, ToLinesSatrec, CalculateTime, Period };
