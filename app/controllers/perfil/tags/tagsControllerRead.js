class TagsController {
    getPage(req, res) {
        res.render("pages/tags.ejs");
    }
}

const TagsControllerRead = new TagsController();

module.exports = TagsControllerRead;