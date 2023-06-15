class TagsController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/tags.ejs", {
            data: {
                page_name: "Tags",
                premium
            }
        });
    }
}

const TagsControllerRead = new TagsController();

module.exports = TagsControllerRead;