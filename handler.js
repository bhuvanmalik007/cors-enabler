'use strict';
const fetch = require('node-fetch');

module.exports.corsEnabler = async event => {
  if(event.queryStringParameters && event.queryStringParameters.url){
    const url = event.queryStringParameters.url;
    const response = await fetch(event.queryStringParameters.url);
    const json = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          error: false,
          message: "URL found: " + url,
          data: json,
        }
      ),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
  else{
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          error: true,
          message: "URL not found."
        }
      ),
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    };
  }
};
