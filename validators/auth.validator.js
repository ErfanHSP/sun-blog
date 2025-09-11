const yup = require("yup")

const authValidator = yup.object().shape({
    phone: yup.string().required("Phone number is required.").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Phone number is not valid.")
})

module.exports = authValidator