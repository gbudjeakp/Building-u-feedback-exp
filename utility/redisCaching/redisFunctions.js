//Importing relevant modules
const util = require("util");
const redisClient = require("../redisCaching/redisCache");
const redis = require("redis");

const redisGet = async (key) => {
  try {
    const response = await redisClient.GET(key);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const redisSetEX = async (key, seconds, value) => {
  try {
    await redisClient.SETEX(key, seconds, value);
  } catch (err) {
    console.error(err);
  }
};

const cacheGetAllExerciseInfo = async () => {
  try {
    let cacheResponse = await redisGet("ExerciseInfo");
    console.log(cacheResponse);
    if (cacheResponse !== undefined && cacheResponse !== null) {
      let response = JSON.parse(cacheResponse);
      console.log(response);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

const cacheGetFeedbackRequestForms = async () => {
  try {
    let cacheResponse = await redisGet("FeedbackRequestForms");
    console.log(cacheResponse);
    if (cacheResponse !== undefined && cacheResponse !== null) {
      let response = JSON.parse(cacheResponse);
      console.log(response);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

const cacheGetUserFeedbackRequestForms = async () => {
  try {
    let cacheResponse = await redisGet("UserFeedbackRequestForms");
    console.log(cacheResponse);
    if (cacheResponse !== undefined && cacheResponse !== null) {
      let response = JSON.parse(cacheResponse);
      console.log(response);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

const cacheGetAssignedFeedbacks = async () => {
  try {
    let cacheResponse = await redisGet("AssignedFeedbacks");
    console.log(cacheResponse);
    if (cacheResponse !== undefined && cacheResponse !== null) {
      let response = JSON.parse(cacheResponse);
      console.log(response);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  redisGet,
  redisSetEX,
  cacheGetAllExerciseInfo,
  cacheGetFeedbackRequestForms,
  cacheGetUserFeedbackRequestForms,
  cacheGetAssignedFeedbacks,
};
