
module.exports.ApiError = class ApiError extends Error {
  constructor(code, message, inner = '') {
    super(message);
    this.code = code;
    this.inner = inner;
  }
};

module.exports.getErrorResponse = (context, message, e) => {
  context.log(e.message);
  context.log(e.stack);
  if (e.inner) context.log(e.inner);

  return {
    statusCode: e.code || 500,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ message }, null, 2),
  };
};

module.exports.getResponse = (payload, code = 200) => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(payload || { message: 'Success' }, null, 2),
});

module.exports.isNumeric = (str) => {
  if (typeof str != "string") {
    return false; 
  }
  return !isNaN(str) && !isNaN(parseFloat(str));
}

module.exports.distance = (lat1, lon1, lat2, lon2, unit = 'K') => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=='K') { dist = dist * 1.609344 }
		if (unit=='N') { dist = dist * 0.8684 }
		return dist;
	}
}