const { body } = require("express-validator");

const validationMiddleware = {
    cadastroValidationRules: [
        body("nome")
        .isLength({min: 3, max: 255})
        .withMessage("Insira seu nome completo!"),
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("data_nascimento")
        .isLength({min: 10, max: 10})
        .withMessage("Insira sua data de nascimento no padrão DD/MM/YYYY")
        .matches(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/)
        .withMessage("Insira sua data de nascimento no padrão DD/MM/YYYY"),
        body("senha")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial!")
    ],
    recuperarSenhaValidationRules: [
        body("senha")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial!")
    ],
    faleConoscoValidationRules: [
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("duvida")
        .isString()
        .isLength({min: 1, max: 500})
        .withMessage("Insira uma mensagem até o limite de caracteres!")
    ]
}

module.exports = validationMiddleware;