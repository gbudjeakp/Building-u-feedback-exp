const { error } = require("console");

module.exports = (input) => {
  let errors = {};
  let linkPattern = /^(?:(?:https):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  ;

  for (let [key, value] of Object.entries(input)) {
    if (typeof value !== "string") {
      errors[key] = `link and topic of learning session must be a string`;
    }
  }

  // topicOfLearningSession
  if (input.topicOfLearningSession.length <= 0 || input.codeLink.length <= 0) {
    errors.topicOfLearningSession = "Topics or code Link field cannot be empty";
  }

  if (input.topicOfLearningSession.length < 3) {
    errors.topicOfLearningSession =
      "Topic name must be at least 3 characters long";
  }

  //Proper link validation procedure

  if(input.codeLink.length <= 0){
    errors.codeLink = "Link Field Cannot be empty";
  }

  if(!linkPattern.test(input.codeLink)){
    errors.codeLink = "Please enter a valid url";
  }

  /** This is what determins if our controllers should execute the logic.
   It just checks the error object to see if there are any errors inside
   if there's an error then that means that the entered input is not valid
   and thus the controller should not run. **/
  let validationCheck = !Object.keys(errors).length ? true : false;

  return {
    errors,
    validationCheck,
  };
};
