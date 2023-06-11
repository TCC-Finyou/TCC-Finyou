class QuestionarioController {
    getPage(req, res) {
        return res.render("pages/questionario.ejs");
    }
}

const QuestionarioControllerRead = new QuestionarioController();

module.exports = QuestionarioControllerRead;