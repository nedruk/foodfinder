'use strict';

const utils = require('../utils/utils');
const { ValidationError } = require('../utils/utils');

const fn = {
  getRequestParams: (req) => {
    const lat = decodeURIComponent(req.query.lat);
    const long = decodeURIComponent(req.query.long);

    if (lat === "undefined" || long === "undefined") {
      throw new ValidationError("parameters 'lat' and 'long' are mandatory")
    }       
    if (!utils.isNumeric(lat) || !utils.isNumeric(long)) {
      throw new ValidationError("parameters 'lat' and 'long' are invalid")
    } 

    // validate that user is searching in sun francisco

    return { lat: parseFloat(lat), long: parseFloat(long) }
  },
}

module.exports.handler = async function(context, req) {
  try{
    const { lat, long } = fn.getRequestParams(req);

    context.res = utils.getResponse({ message: `getting foodtrucks for lat: ${lat} - long: ${long}`});
  }
  catch (e) {
    context.log(e.stack);
    context.res = utils.getErrorResponse(context, `Couldn't fetch nearest food trucks: ${e.message}.`, e.code);
  }
};
