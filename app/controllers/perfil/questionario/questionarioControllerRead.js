class QuestionarioController {
    getPage(req, res) {
        res.render("pages/questionario.ejs");
    }
}

const QuestionarioControllerRead = new QuestionarioController();

module.exports = QuestionarioControllerRead;