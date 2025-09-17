const path = require("path")
const configs = require("./../configs/configs")
const BlogModel = require("./../models/BlogModel")

exports.displayCreateBlogPage = (req, res, next) => {
    try {
        res.sendFile(path.join(configs.frontendPath, "blog-create.html"))
    } catch (error) {
        next(error)
    }
}

exports.createNewBlog = async (req, res, next) => {
    try {
        let {title, content, slug, status, tags, metaTitle, metaDescription} = req.body
        console.log(title, content, slug, status, tags, metaTitle, metaDescription);
        
        if (!title || !content || !status) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed: Missing Fields."
            })
        }
        const checkDuplicateSlug = await BlogModel.findOne({where: {slug}})
        if (checkDuplicateSlug) {
            return res.status(400).json({
                success: false,
                message: "Specified Slug is already in use. Please enter an unique slug."
            })
        }
        let FormatTags = [];
        if (tags) {
            FormatTags = tags.trim().split("-")
        }
        
        const newBlog = BlogModel.build({
            title,
            content,
            slug,
            status,
            tags: FormatTags,
            metaTitle: metaTitle ? metaTitle : null,
            metaDescription: metaDescription ? metaDescription : null
        })
        await newBlog.save()
        return res.status(201).json({
            success: true,
            message: "Blog successfully generated.",
            newBlog
        })
    } catch (error) {
        next(error)
    }
}