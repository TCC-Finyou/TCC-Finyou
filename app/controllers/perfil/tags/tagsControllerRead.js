class TagsController {
    getPage(req, res) {
        return res.render("pages/tags.ejs");
    }
}

const TagsControllerRead = new TagsController();

module.exports = TagsControllerRead;