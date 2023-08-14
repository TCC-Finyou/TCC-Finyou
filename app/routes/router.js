const express = require("express");
const router = express.Router();

// * Info pages

const homeControllerRead = require("../controllers/info-pages/homeControllerRead");
const sobreControllerRead = require("../controllers/info-pages/sobreControllerRead");
const pacoteControllerRead = require("../controllers/info-pages/pacoteControllerRead");
const faleConoscoControllerRead = require("../controllers/info-pages/faleConosco/faleConoscoControllerRead");

// * Recuperar senha

const recuperarSenhaControllerRead = require("../controllers/info-pages/recuperarSenhaControllerRead");
const redefinirSenhaControllerRead = require("../controllers/info-pages/redefinirSenha/RedefinirSenhaControllerRead");
const redefinirSenhaControllerUpdate = require("../controllers/info-pages/redefinirSenha/RedefinirSenhaControllerUpdate");

// * Recuperar senha Middlware

const redefinirSenhaMiddleware = require("../middlewares/recoverPasswordMiddleware");

// * Cadastro Controllers

const cadastroControllerRead = require("../controllers/info-pages/cadastro/cadastroControllerRead");
const cadastroControllerCreate = require("../controllers/info-pages/cadastro/cadastroControllerCreate");

// * Login Controllers

const loginControllerRead = require("../controllers/info-pages/login/loginControllerRead");
const loginControllerReadAuth = require("../controllers/info-pages/login/loginControllerReadAuth");

// * Cadastro e Login Middlewares

const authenticationMiddleware = require("../middlewares/authMiddleware");
const validationRulesMiddleware = require("../middlewares/validationRulesMiddleware");
const formValidationMiddleware = require("../middlewares/formValidationMiddlewares");

// * Perfil

const homePerfilControllerRead = require("../controllers/perfil/homePerfil/homePerfilControllerRead");

const adicionarContaControllerRead = require("../controllers/perfil/adicionarConta/adicionarContaControllerRead");

const metasControllerRead = require("../controllers/perfil/metas/metasControllerRead");

const tagsControllerRead = require("../controllers/perfil/tags/tagsControllerRead");

const questionarioControllerRead = require("../controllers/perfil/questionario/questionarioControllerRead");

const relatorioControllerRead = require("../controllers/perfil/relatorios/relatorioControllerRead");

const contaConjuntaControllerRead = require("../controllers/perfil/contaConjunta/contaConjuntaControllerRead");

// * Plano de assinatura Finyou+

const pagamentoAssinaturaControllerRead = require("../controllers/info-pages/assinatura/pagamentoAssinaturaControllerRead");

const pagamentoAssinaturaControllerCreate = require("../controllers/info-pages/assinatura/pagamentoAssinaturaControllerCreate")

const assinaturaPortalControllerCreate = require("../controllers/info-pages/assinatura/assinaturaPortalControllerCreate");

const stripeWebhookController = require("../controllers/webhook/stripeWebhook");

const sucessoControllerRead = require("../controllers/info-pages/assinatura/sucessoControllerRead");
const cancelamentoControllerRead = require("../controllers/info-pages/assinatura/cancelamentoControllerRead");

// * Info pages
router.get("/",
homeControllerRead.getPage);

router.get("/sobre",
sobreControllerRead.getPage);

router.get("/pacotes",
pacoteControllerRead.getPage);

router.get("/fale-conosco",
faleConoscoControllerRead.getPage);

router.post("/fale-conosco",
validationRulesMiddleware.faleConoscoValidationRules,
formValidationMiddleware.faleConoscoValidation,
faleConoscoControllerRead.sendMessage);

// * Recuperar senha

router.get("/recuperar-senha",
recuperarSenhaControllerRead.getPage);

router.post("/recuperar-senha",
recuperarSenhaControllerRead.recoverPassword);

router.get("/redefinir-senha/:token",
redefinirSenhaMiddleware.validateLink,
redefinirSenhaControllerRead.getPage);

router.post("/redefinir-senha/:token",
redefinirSenhaMiddleware.validateLink,
validationRulesMiddleware.recuperarSenhaValidationRules,
formValidationMiddleware.recuperarSenhaValidation,
authenticationMiddleware.encryptRecoveredPassword,
redefinirSenhaControllerUpdate.updatePassword);

// * Cadastro
router.get("/cadastro",
cadastroControllerRead.getPage);

router.post("/cadastro",
validationRulesMiddleware.cadastroValidationRules,
formValidationMiddleware.cadastroValidation,
authenticationMiddleware.encryptPassword,
cadastroControllerCreate.createUser);

// * Login
router.get("/login",
loginControllerRead.getPage);

router.post("/login",
formValidationMiddleware.loginValidation,
loginControllerReadAuth.authUser);

// * Perfil
router.get("/perfil",
authenticationMiddleware.validateJWT,
homePerfilControllerRead.getPage);

router.get("/adicionar-conta",
authenticationMiddleware.validateJWT,
adicionarContaControllerRead.getPage);

router.get("/metas",
authenticationMiddleware.validateJWT,
metasControllerRead.getPage);

router.get("/tags",
authenticationMiddleware.validateJWT,
tagsControllerRead.getPage);

router.get("/relatorios",
authenticationMiddleware.validateJWT,
relatorioControllerRead.getPage);

router.get("/questionario",
authenticationMiddleware.validateJWT,
authenticationMiddleware.verifyPremium,
questionarioControllerRead.getPage);

// * Conta conjunta
router.get("/conta-conjunta",
authenticationMiddleware.validateJWT,
authenticationMiddleware.verifyPremium,
contaConjuntaControllerRead.getPage);

// * Plano de assinatura Finyou+

router.get("/pagamento-assinatura",
authenticationMiddleware.validateJWT,
pagamentoAssinaturaControllerRead.getPage);

router.post("/pagamento-assinatura",
authenticationMiddleware.validateJWT,
pagamentoAssinaturaControllerCreate.createCustomerSubscription);

router.post("/criar-portal-assinatura",
authenticationMiddleware.validateJWT,
assinaturaPortalControllerCreate.criarPortalAssinatura);

router.post("/webhook",
express.raw({type: "application/json"}),
stripeWebhookController.realTimeUpdate);

router.get("/compra-efetuada",
authenticationMiddleware.validateJWT,
sucessoControllerRead.getPage);

router.get("/compra-cancelada",
authenticationMiddleware.validateJWT,
cancelamentoControllerRead.getPage);

module.exports = router;
