class QuestionarioController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/questionario.ejs", {
            data: {
                page_name: "Questionário",
                premium
            }
        });
    }
}

const QuestionarioControllerRead = new QuestionarioController();

module.exports = QuestionarioControllerRead;