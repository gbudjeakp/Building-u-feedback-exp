const redisClient = require("../redisCaching/redisCache");
const logger = require("../logger/logger");
require("dotenv").config();

const redisGet = async (key) => {
  try {
    const response = await redisClient.GET(key);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const redisSetEX = async (key, seconds, value, token) => {
  try {
    await redisClient.SETEX(`${key}-${token}`, seconds, value);
  } catch (err) {
    console.error(err);
  }
};

const cacheGetAllExerciseInfo = async () => {
  try {
    let cacheResponse = await redisGet(`ExerciseInfo`);
    if (cacheResponse) {
      let response = JSON.parse(cacheResponse);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

const cacheGetFeedbackRequestForms = async (token) => {
  try {
    let cacheResponse = await redisGet(`FeedbackRequestForms-${token}`);
    if (cacheResponse) {
      let response = JSON.parse(cacheResponse);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

const cacheGetUserFeedbackRequestForms = async (token) => {
  try {
    let cacheResponse = await redisGet(`UserFeedbackRequestForms-${token}`);
    if (cacheResponse) {
      let response = JSON.parse(cacheResponse);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};

const cacheGetAssignedFeedbacks = async (token) => {
  try {
    let cacheResponse = await redisGet(`AssignedFeedbacks-${token}`);
    if (cacheResponse) {
      let response = JSON.parse(cacheResponse);
      return response;
    } else {
      return "No Cache Hit";
    }
  } catch (err) {
    console.error(err);
  }
};
const cacheInvalidator = async (keys) => {
  try {
    await keys.forEach((key) => {
      redisClient.DEL(key);
    });
    logger.info("success");
  } catch (error) {
    logger.error(error);
  }
};
const cacheGetUserInfo = async (token) => {
  try {
    const response = await redisGet(`UserInfo-${token}`);
    return JSON.parse(response);
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  redisGet,
  redisSetEX,
  cacheGetAllExerciseInfo,
  cacheGetFeedbackRequestForms,
  cacheGetUserFeedbackRequestForms,
  cacheGetAssignedFeedbacks,
  cacheInvalidator,
  cacheGetUserInfo,
};
