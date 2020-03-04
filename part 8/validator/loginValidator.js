const validator = require("validator");

const validate = user => {
  let error = {};

  if (!user.email) {
    error.email = "pls give email";
  } else if (!validator.isEmail(user.email)) {
    error.email = "pls give valid email";
  }

  if (!user.password) {
    error.password = "pls give password";
  }


  return {
    error,
    isValid: Object.keys(error).length == 0
  };
};

module.exports = validate;
