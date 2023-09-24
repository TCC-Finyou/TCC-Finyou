const tagModel = require("../../../models/Tag");
const jwt = require("jsonwebtoken");

class TagsController {
    async getPage(req, res) {
        const premium = req.session.premium;
        const token = req.session.token;
        const { userId } = jwt.decode(token, process.env.secret);

        const tags = await tagModel.getAllTagsFromUser(userId);

        return res.render("pages/tags.ejs", {
            data: {
                page_name: "Tags",
                premium,
                tags
            }
        });
    }
}

const TagsControllerRead = new TagsController();

module.exports = TagsControllerRead;