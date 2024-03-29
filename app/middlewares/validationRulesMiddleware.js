const { body } = require("express-validator");

const validationMiddleware = {
    cadastroValidationRules: [
        body("nome")
        .trim()
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
    editarPerfilValidationRules: [
        body("nome")
        .trim()
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
    ],
    editarPerfilUsuarioAdminValidationRules: [
        body("nome")
        .trim()
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
        body("cargo")
        .isIn(["user", "admin"])
        .withMessage("Selecione uma opção válida!")
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
        .trim()
        .isString()
        .isLength({min: 1, max: 120})
        .withMessage("Insira uma mensagem até o limite de caracteres!")
    ],
    metaValidationRules: [
        body("nome_meta")
        .trim()
        .isString()
        .isLength({min: 1})
        .withMessage("Insira um nome para a sua meta!")
        .isLength({max: 120})
        .withMessage("Sua meta não pode ultrapassar 120 caracteres!"),
        body("valor_meta")
        .isFloat({min: 1})
        .withMessage("Você não pode criar uma meta com valor menor que R$ 1!")
        .isFloat({max: 99999999})
        .withMessage("Você não pode criar uma com valor maior que R$ 99.999.999!"),
        body("valor_destinado")
        .isFloat({min: 1})
        .withMessage("Você deve destinar pelo menos 1 real para a sua meta!")
        .isFloat({max: 99999999})
        .withMessage("Você não pode destinar mais de R$ 99.999.999 para a sua meta!"),
        body("periodo_deposito")
        .notEmpty()
        .withMessage("Escolha de quanto em quanto tempo você gostaria que o dinheiro fosse direcionado para essa meta!")
    ],
    tagValidationRules: [
        body("nome_tag")
        .trim()
        .isString()
        .isLength({min: 1})
        .withMessage("Insira um nome para a sua tag!")
        .isLength({max: 120})
        .withMessage("Sua tag não pode ultrapassar 120 caracteres!"),
        body("cor_tag")
        .trim()
        .isString()
        .withMessage("Selecione uma cor para a sua tag!")
        .isLength({min: 7, max: 7})
        .withMessage("Selecione uma cor válida para a sua tag!")
    ],
    transacaoValidationRules: [
        body("tag")
        .trim()
        .isString()
        .withMessage("Selecione uma transação!"),
        body("nome")
        .trim()
        .isString()
        .withMessage("Informe um nome para a sua transação!")
        .isLength({min: 3})
        .withMessage("Sua transaçao não pode ter menos de 3 caracteres!")
        .isLength({max: 255})
        .withMessage("Sua transação não pode ter mais de 255 caracteres!"),
        body("valor")
        .isFloat({min: 0})
        .withMessage("Informe um valor válido para a sua transação")
        .isFloat({max: 1000000})
        .withMessage("O valor máximo da sua transação é de 1.000.000"),
        body("tipo_transacao")
        .isIn(["gasto", "lucro"])
        .withMessage("Selecione uma opção válida para o tipo da transação!"),
        body("meio_transacao")
        .trim()
        .isString()
        .withMessage("Digite o meio que essa transação foi feita!")
        .isLength({min: 3})
        .withMessage("O meio para a transação deve ter no mínimo 3 caracteres!")
        .isLength({max: 100})
        .withMessage("O meio para a transação deve ter no máximo 100 caracteres!")
    ]
}

module.exports = validationMiddleware;