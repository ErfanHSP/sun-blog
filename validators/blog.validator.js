const yup = require("yup");

const blogValidator = yup.object().shape({
    title: yup.string().required("Title is required.").min(3).max(200, "The length of title exceeds the allowable limit."),
    content: yup.string().required("Content can not be empty."),
    slug: yup.string().required("Please specify a slug to your blog."),
    status: yup.string().required(),
    tags: yup.string().optional(),
    metaTitle: yup.string().optional(),
    description: yup.string().optional()

});

module.exports = blogValidator