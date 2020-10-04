'use strict';
const httpFunction = require('./getNearestFoodtrucks');
const context = require('../test/defaultContext')
const data = require('../test/sampleData')

jest.mock('node-fetch');
const fetch = require( 'node-fetch');
const {Response} = jest.requireActual('node-fetch');

beforeEach(() => {
  fetch.mockClear();
  context.log.mockClear();
});

it('returns exactly 5 locations', async () => {

    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(data.defaultData))));

    const request = {
        query: { lat: '37.792524940842', long: '-122.399415781865' }
    };

    await httpFunction.handler(context, request);

    expect(JSON.parse(context.res.body).length).toBe(5);
});

it('returns validation error - location data fetch fails', async () => {

  fetch.mockImplementationOnce(() => Promise.reject("API is down"));

  const request = {
    query: { lat: '37.792524940842', long: '-122.399415781865' }
  };

  await httpFunction.handler(context, request);

  expect(context.res.statusCode).toEqual(503);
  expect(context.log.mock.calls.length).toBe(3);
  expect(context.res.body).toEqual(JSON.stringify({ message: `Couldn't fetch nearest food trucks: location data is currently unavaliable.`}, null, 2));
});

it('returns validation error - no location data', async () => {

  fetch.mockReturnValue(Promise.resolve(new Response('[]')));

  const request = {
    query: { lat: '37.792524940842', long: '-122.399415781865' }
  };

  await httpFunction.handler(context, request);

  expect(context.res.statusCode).toEqual(503);
  expect(context.log.mock.calls.length).toBe(2);
  expect(context.res.body).toEqual(JSON.stringify({ message: `Couldn't fetch nearest food trucks: location data is currently unavaliable.`}, null, 2));
});

it('returns validation error - quest params are mandatory', async () => {

  const request = {
    query: {}
  };

  await httpFunction.handler(context, request);

  expect(context.res.statusCode).toEqual(400);
  expect(context.log.mock.calls.length).toBe(2);
  expect(context.res.body).toEqual(JSON.stringify({ message: `Couldn't fetch nearest food trucks: parameters 'lat' and 'long' are mandatory.`}, null, 2));
});



