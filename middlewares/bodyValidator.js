const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({
          success: false,
          message: "Request body must be non-null JSON object."
        })
      }

      await schema.validate(req.body, { abortEarly: false }) // ✅ Yup syntax
      next()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        validationError: true,
        errors: error.errors || error.message
      })
    }
  }
}

module.exports = bodyValidator
