"use strict";
const fetch = require("node-fetch");

module.exports.corsEnabler = async (event) => {
  console.log(event);
  if (event.queryStringParameters && event.queryStringParameters.url) {
    const urls = event.queryStringParameters.url.split(",");
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url).then(function (response) {
          return response.json();
        })
      )
    )
      .then(function (data) {
        return data;
      })
      .catch(function (error) {
        console.log(error);
      });

    // const response = await fetch(event.queryStringParameters.url);
    // const json = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "URL(s) found: " + urls,
        data: responses,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: "No url found.",
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

module.exports.corsEnablerPost = async (event) => {
  console.log(event);
  if (event.queryStringParameters && event.queryStringParameters.url) {
    const urls = event.queryStringParameters.url.split(",");
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: event.body,
        }).then(function (response) {
          return response.json();
        })
      )
    )
      .then(function (data) {
        return data;
      })
      .catch(function (error) {
        console.log(error);
      });

    // const response = await fetch(event.queryStringParameters.url);
    // const json = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "URL(s) found: " + urls,
        data: responses,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: "No url found.",
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
