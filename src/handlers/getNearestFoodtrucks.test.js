'use strict';

const httpFunction = require('./getNearestFoodtrucks');
const context = require('../test/defaultContext')

test('Http trigger should return known text', async () => {

    const request = {
        query: { lat: '37.792524940842', long: '-122.399415781865' }
    };

    await httpFunction.handler(context, request);

    expect(context.res.body).toEqual(JSON.stringify({ message: `getting foodtrucks for lat: 37.792524940842 - long: -122.399415781865`}, null, 2));
});

test('Http trigger should return validation error', async () => {

  const request = {
    query: {}
  };

  await httpFunction.handler(context, request);

  expect(context.res.statusCode).toEqual(400);
  expect(context.log.mock.calls.length).toBe(2);
  expect(context.res.body).toEqual(JSON.stringify({ message: `Couldn't fetch nearest food trucks: parameters 'lat' and 'long' are mandatory.`}, null, 2));
});