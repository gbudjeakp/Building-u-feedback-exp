module.exports = (input) => {
  let errors = {};
  let linkPattern =
    /^(?:(?:https):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  let injectionChecker = /<\s*script.*?\/?\s*>|on\w+\s*=\s*".*?"/i;
  //@TODO
  /* 1) Maybe add length validation to feedback input  
    2) Maybe add a Line Breaks, and trimming Formatting, we'll see
       once we start saving feedbacks.
*/

  for (let [key, value] of Object.entries(input)) {
    if (typeof value !== "string") {
      errors[key] = `link and topic of learning session must be a string`;
    }
  }

  if (input.topicOfLearningSession.length <= 0 || input.codeLink.length <= 0) {
    errors.topicOfLearningSession = "Topics or code Link field cannot be empty";
  }

  if (input.topicOfLearningSession.length < 3) {
    errors.topicOfLearningSession =
      "Topic name must be at least 3 characters long";
  }

  if (input.codeLink.length <= 0) {
    errors.codeLink = "Link Field Cannot be empty";
  }

  if (!linkPattern.test(input.codeLink)) {
    errors.codeLink = "Please enter a valid url";
  }

  if (
    injectionChecker.test(input.topicOfLearningSession) ||
    injectionChecker.test(input.studentName)
  ) {
    errors.script =
      "Sorry, the input contains invalid characters or scripting elements. Please remove any special characters and try again.";
  }

  let validationCheck = !Object.keys(errors).length ? true : false;

  return {
    errors,
    validationCheck,
  };
};
