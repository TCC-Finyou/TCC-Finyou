const {Router} = require("express");
const router = Router();

// * Info pages

const HomeControllerRead = require("../controllers/info-pages/homeControllerRead");
const SobreControllerRead = require("../controllers/info-pages/sobreControllerRead");
const PacoteControllerRead = require("../controllers/info-pages/pacoteControllerRead");
const ComprarPacoteControllerRead = require("../controllers/info-pages/comprarPacoteControllerRead");
const FaleConoscoControllerRead = require("../controllers/info-pages/faleConosco/faleConoscoControllerRead");

// * Recuperar senha

const RecuperarSenhaControllerRead = require("../controllers/info-pages/recuperarSenhaControllerRead");
const RedefinirSenhaControllerRead = require("../controllers/info-pages/redefinirSenha/RedefinirSenhaControllerRead");
const RedefinirSenhaControllerUpdate = require("../controllers/info-pages/redefinirSenha/RedefinirSenhaControllerUpdate");

// * Recuperar senha Middlware

const RedefinirSenhaMiddleware = require("../middlewares/recoverPasswordMiddleware");

// * Cadastro Controllers

const CadastroControllerRead = require("../controllers/info-pages/cadastro/cadastroControllerRead");
const CadastroControllerCreate = require("../controllers/info-pages/cadastro/cadastroControllerCreate");

// * Login Controllers

const LoginControllerRead = require("../controllers/info-pages/login/loginControllerRead");
const LoginControllerReadAuth = require("../controllers/info-pages/login/loginControllerReadAuth");

// * Cadastro e Login Middlewares

const AuthenticationMiddleware = require("../middlewares/authMiddleware");
const validationRulesMiddleware = require("../middlewares/validationRulesMiddleware");
const FormValidationMiddleware = require("../middlewares/formValidationMiddlewares");

// * Perfil

const HomePerfilControllerRead = require("../controllers/perfil/homePerfil/homePerfilControllerRead");
const AdicionarContaControllerRead = require("../controllers/perfil/adicionarConta/adicionarContaControllerRead");
const MetasControllerRead = require("../controllers/perfil/metas/metasControllerRead");
const TagsControllerRead = require("../controllers/perfil/tags/tagsControllerRead");
const QuestionarioControllerRead = require("../controllers/perfil/questionario/questionarioControllerRead");
const ContaConjuntaControllerRead = require("../controllers/perfil/contaConjunta/contaConjuntaControllerRead");

// * Info pages
router.get("/",
HomeControllerRead.getPage);

router.get("/sobre",
SobreControllerRead.getPage);

router.get("/pacotes",
PacoteControllerRead.getPage);

router.get("/comprar-pacote",
ComprarPacoteControllerRead.getPage);

router.get("/fale-conosco",
FaleConoscoControllerRead.getPage);

// * Recuperar senha

router.get("/recuperar-senha",
RecuperarSenhaControllerRead.getPage);

router.post("/recuperar-senha",
RecuperarSenhaControllerRead.recoverPassword);

router.get("/redefinir-senha/:token",
RedefinirSenhaMiddleware.validateLink,
RedefinirSenhaControllerRead.getPage);

router.post("/redefinir-senha/:token",
RedefinirSenhaMiddleware.validateLink,
validationRulesMiddleware.recuperarSenhaValidationRules,
FormValidationMiddleware.recuperarSenhaValidation,
AuthenticationMiddleware.encryptRecoveredPassword,
RedefinirSenhaControllerUpdate.updatePassword);

// * Cadastro
router.get("/cadastro",
CadastroControllerRead.getPage);

router.post("/cadastro",
validationRulesMiddleware.cadastroValidationRules,
FormValidationMiddleware.cadastroValidation,
AuthenticationMiddleware.encryptPassword,
CadastroControllerCreate.createUser);

// * Login
router.get("/login",
LoginControllerRead.getPage);

router.post("/login",
FormValidationMiddleware.loginValidation,
LoginControllerReadAuth.authUser);

// * Perfil
router.get("/perfil",
AuthenticationMiddleware.validateJWT,
HomePerfilControllerRead.getPage);

router.get("/adicionar-conta",
AuthenticationMiddleware.validateJWT,
AdicionarContaControllerRead.getPage);

router.get("/metas",
AuthenticationMiddleware.validateJWT,
MetasControllerRead.getPage);

router.get("/tags",
AuthenticationMiddleware.validateJWT,
TagsControllerRead.getPage);

router.get("/questionario",
AuthenticationMiddleware.validateJWT,
AuthenticationMiddleware.verifyPremium,
QuestionarioControllerRead.getPage);

// * Conta conjunta
router.get("/conta-conjunta",
AuthenticationMiddleware.validateJWT,
AuthenticationMiddleware.verifyPremium,
ContaConjuntaControllerRead.getPage);

module.exports = router;