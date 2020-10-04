'use strict';

const fetch = require( 'node-fetch');

const utils = require('../utils/utils');
const { ApiError } = require('../utils/utils');

const fn = {
  getRequestParams: (req) => {
    const lat = decodeURIComponent(req.query.lat);
    const long = decodeURIComponent(req.query.long);

    if (lat === "undefined" || long === "undefined") {
      throw new ApiError(400, "parameters 'lat' and 'long' are mandatory")
    }       
    if (!utils.isNumeric(lat) || !utils.isNumeric(long)) {
      throw new ApiError(400, "parameters 'lat' and 'long' are invalid")
    } 

    return { lat: parseFloat(lat), long: parseFloat(long) }
  },
  getFoodtrucks: async() => {
    const url = 'https://data.sfgov.org/resource/rqzj-sfat.json';
    const data = [];    
    try {
      const res = await fetch(url, { method: 'GET' });
      data.push(...(await res.json()));
    } catch (e) {
      throw new ApiError(503, "location data is currently unavaliable", JSON.stringify(e))
    }

    if(data.length === 0){
      throw new ApiError(503, "location data is currently unavaliable")
    }

    return data.filter(r => r.latitude !== '0' && r.longitude !== '0' && utils.isNumeric(r.latitude) && utils.isNumeric(r.longitude));
  },
  groupByDistance: (data, lat, long) => data.reduce((c, v) => {
      const k = utils.distance(lat, long, parseFloat(v.latitude), parseFloat(v.longitude));
      const arr = c.has(k) ? c.get(k) : [];
      arr.push({...v, distance: k});
      c.set(k, arr);
      return c;
    }, new Map())
}

module.exports.handler = async function(context, req) {
  try{
    const { lat, long } = fn.getRequestParams(req);

    const foodtrucks = await fn.getFoodtrucks();
    const groupped = fn.groupByDistance(foodtrucks, lat, long);
    const sorted = Array.from(groupped.keys()).sort((a, b) => a - b);

    const nearest = sorted.slice(0, 5)
      .reduce((arr,v) => [...arr, ...groupped.get(v)], [])
      .slice(0, 5);

    context.res = utils.getResponse(nearest);
  }
  catch (e) {
    console.log(`MESSAGE: ${JSON.stringify(e.message)}`)
    console.log(`STACK: ${JSON.stringify(e.stack)}`)
    console.log(`INNER: ${JSON.stringify(e.inner)}`)
    context.res = utils.getErrorResponse(context, `Couldn't fetch nearest food trucks: ${e.message}.`, e);
  }
};
