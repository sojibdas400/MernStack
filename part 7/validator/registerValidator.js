const validator = require("validator");

const validate = user => {
  let error = {};

  if (!user.name) {
    error.name = "pls give name";
  }

  if (!user.email) {
    error.email = "pls give email";
  } else if (!validator.isEmail(user.email)) {
    error.email = "pls give valid email";
  }

  if (!user.password) {
    error.password = "pls give password";
  } else if (user.password < 6) {
    error.password = "password must be at least 6 letters";
  }
  if (!user.confirmPassword) {
    error.confirmPassword = "pls give confirmation Password";
  } else if (user.password != user.confirmPassword) {
    error.confirmPassword = "Password does not match";
  }

  return {
    error,
    isValid: Object.keys(error).length == 0
  };
};

module.exports = validate;
