const yup = require("yup");

const authValidator = yup.object().shape({
   username: yup.string().required("Username is required."),
   fullname: yup.string().required("Fullname is required"),
   bio: yup.string().optional()
});

module.exports = authValidator