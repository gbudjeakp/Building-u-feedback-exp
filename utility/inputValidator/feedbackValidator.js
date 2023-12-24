module.exports = (input) => {
  let errors = {};
  let injectionChecker = /<\s*script.*?\/?\s*>|on\w+\s*=\s*".*?"/i;

  if (!input) {
    return {
      errors: { msg: "Input is required" },
      validationCheck: false,
    };
  }
  
  for (let [key, value] of Object.entries(input)) {
    if (typeof value !== "string") {
      errors[key] = `link and topic of learning session must be a string`;
    }
  }

  if (input.feedback.length <= 0) {
    errors.feedback = "Field cannot be empty ";
  }

  if (injectionChecker.test(input.feedback)) {
    errors.feedback =
      "Sorry, the input contains invalid characters or scripting elements. Please remove any special characters and try again.";
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
