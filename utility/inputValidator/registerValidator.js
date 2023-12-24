module.exports = (input) => {
  let errors = {};
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!input) {
    return {
      errors: { msg: "Input is required" },
      validationCheck: false,
    };
  }
  for (let [key, value] of Object.entries(input)) {
    if (typeof value !== "string") {
      errors[key] = `Full name, email and password must be a string`;
    }
  }

  if (
    input.password.length <= 0 ||
    input.userName.length <= 0 ||
    input.fName.length <= 0
  ) {
    errors.password = "Password Field Cannot be empty";
  }
  if (input.password.length < 8) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (input.password.length > 30) {
    errors.password = "Password cannot be more than 30 characters long";
  }

  if (input.fName.length < 3) {
    errors.fName = "Full Name must be at least 3 characters long";
  }

  if (!emailPattern.test(input.userName)) {
    errors.email = "email is not valid";
  }

  let validationCheck = !Object.keys(errors).length ? true : false;

  return {
    errors,
    validationCheck,
  };
};
