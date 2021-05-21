import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import passwordValidator from 'password-validator';

let schema = new passwordValidator();

schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(20) // Maximum length 20
  .has()
  .not()
  .spaces(); // Should not have spaces

export function validateLogin(data) {
  let errors = {};
  if (
    !data ||
    !data.username ||
    !(isEmail(data.username) || isLength(data.username, {min: 6, max: 20}))
  ) {
    errors.username = 'Fill data';
  }
  if (!data || !data.password || !schema.validate(data.password)) {
    errors.password = 'Fill data';
  }
  return errors;
}

export function validateForgotPassword(data) {
  let errors = {};
  if (
    !data ||
    !data.email ||
    !(isEmail(data.email) || isLength(data.email, {min: 6, max: 20}))
  ) {
    errors.email = 'Fill data';
  }
  return errors;
}
