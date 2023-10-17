const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// * Info pages

const homeControllerRead = require("../controllers/info-pages/homeControllerRead");
const sobreControllerRead = require("../controllers/info-pages/sobreControllerRead");
const pacoteControllerRead = require("../controllers/info-pages/pacoteControllerRead");
const politicasPrivacidadeControllerRead = require("../controllers/info-pages/politicasPrivacidadeControllerRead");
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

const logoutControllerRead = require("../controllers/perfil/logoutControllerRead");

const editarPerfilControllerRead = require("../controllers/perfil/editarPerfil/editarPerfilControllerRead");
const editarPerfilControllerUpdate = require("../controllers/perfil/editarPerfil/editarPerfilControllerUpdate");

const homePerfilControllerRead = require("../controllers/perfil/homePerfil/homePerfilControllerRead");

const adicionarContaControllerRead = require("../controllers/perfil/adicionarConta/adicionarContaControllerRead");

const metasControllerRead = require("../controllers/perfil/metas/metasControllerRead");

const criarMetaControllerRead = require("../controllers/perfil/metas/criarMetaControllerRead");

const criarMetaControllerCreate = require("../controllers/perfil/metas/criarMetaControllerCreate");

const editarMetaControllerRead = require("../controllers/perfil/metas/editarMetaControllerRead");

const editarMetaControllerUpdate = require("../controllers/perfil/metas/editarMetaControllerUpdate");

const deletarMetaControllerDelete = require("../controllers/perfil/metas/deletarMetaControllerDelete");

const metaHistoricoControllerRead = require("../controllers/perfil/metas/metaHistorico/metaHistoricoControllerRead");

const tagsControllerRead = require("../controllers/perfil/tags/tagsControllerRead");

const criarTagControllerRead = require("../controllers/perfil/tags/criarTagControllerRead");

const criarTagControllerCreate = require("../controllers/perfil/tags/criarTagControllerCreate");

const editarTagControllerRead = require("../controllers/perfil/tags/editarTagControllerRead");

const editarTagControllerUpdate = require("../controllers/perfil/tags/editarTagControllerUpdate");

const deletarTagControllerDelete = require("../controllers/perfil/tags/deletarTagControllerDelete");

const relatorioControllerRead = require("../controllers/perfil/relatorios/relatorioControllerRead");

const contaConjuntaControllerRead = require("../controllers/perfil/contaConjunta/contaConjuntaControllerRead");

const extratoControllerRead = require("../controllers/perfil/extrato/extratoControllerRead");

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

router.get("/politicas-privacidade",
politicasPrivacidadeControllerRead.getPage);

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
router.get("/logout",
authenticationMiddleware.validateJWT,
logoutControllerRead.logout);

router.get("/editar-perfil",
authenticationMiddleware.validateJWT,
editarPerfilControllerRead.getPage);

router.post("/editar-perfil",
authenticationMiddleware.validateJWT,
validationRulesMiddleware.editarPerfilValidationRules,
formValidationMiddleware.editarPerfilValidation,
editarPerfilControllerUpdate.editUser);

router.get("/perfil",
authenticationMiddleware.validateJWT,
homePerfilControllerRead.getPage);

router.get("/adicionar-conta",
authenticationMiddleware.validateJWT,
adicionarContaControllerRead.getPage);

router.get("/metas",
authenticationMiddleware.validateJWT,
metasControllerRead.getPage);

router.get("/criar-meta",
authenticationMiddleware.validateJWT,
criarMetaControllerRead.getPage);

router.post("/criar-meta",
authenticationMiddleware.validateJWT,
validationRulesMiddleware.metaValidationRules,
formValidationMiddleware.metaCreateValidation,
criarMetaControllerCreate.createMeta);

router.get("/editar-meta/:metaId",
authenticationMiddleware.validateJWT,
editarMetaControllerRead.getPage);

router.post("/editar-meta/:metaId",
authenticationMiddleware.validateJWT,
validationRulesMiddleware.metaValidationRules,
formValidationMiddleware.metaUpdateValidation,
editarMetaControllerUpdate.updateMeta);

router.post("/deletar-meta/:metaId",
authenticationMiddleware.validateJWT,
deletarMetaControllerDelete.deletarMeta);

router.get("/historico-meta/:metaId",
authenticationMiddleware.validateJWT,
metaHistoricoControllerRead.getPage)

router.get("/tags",
authenticationMiddleware.validateJWT,
tagsControllerRead.getPage);

router.get("/criar-tag",
authenticationMiddleware.validateJWT,
criarTagControllerRead.getPage);

router.post("/criar-tag",
authenticationMiddleware.validateJWT,
validationRulesMiddleware.tagValidationRules,
formValidationMiddleware.tagCreateValidation,
criarTagControllerCreate.createTag);

router.get("/editar-tag/:tagId",
authenticationMiddleware.validateJWT,
editarTagControllerRead.getPage);

router.post("/editar-tag/:tagId",
authenticationMiddleware.validateJWT,
validationRulesMiddleware.tagValidationRules,
formValidationMiddleware.tagUpdateValidation,
editarTagControllerUpdate.updateTag);

router.post("/deletar-tag/:tagId",
authenticationMiddleware.validateJWT,
deletarTagControllerDelete.deleteTag);

router.get("/relatorios",
authenticationMiddleware.validateJWT,
relatorioControllerRead.getPage);

router.get("/extrato",
authenticationMiddleware.validateJWT,
extratoControllerRead.getPage);

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
stripeWebhookController.realTimeUpdate);

router.get("/compra-efetuada",
authenticationMiddleware.validateJWT,
sucessoControllerRead.getPage);

router.get("/compra-cancelada",
authenticationMiddleware.validateJWT,
cancelamentoControllerRead.getPage);

module.exports = router;
