const yup = require("yup");

const iranPhoneRegex = /^(?:\+98|0)?9\d{9}$/;

const authValidator = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required.")
    .matches(iranPhoneRegex, "Phone number is not valid.")
});

module.exports = authValidator