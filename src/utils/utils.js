
module.exports.ValidationError = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
};

module.exports.getErrorResponse = (context, message, code = 500) => {
  context.log(message);
  return {
    statusCode: code || 500,
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
