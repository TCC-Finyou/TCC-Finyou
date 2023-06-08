const {Router} = require("express");
const router = Router();

const HomeControllerRead = require("../controllers/info-pages/homeControllerRead");
const SobreControllerRead = require("../controllers/info-pages/sobreControllerRead");
const PacoteControllerRead = require("../controllers/info-pages/pacoteControllerRead");
const CadastroControllerRead = require("../controllers/info-pages/cadastro/cadastroControllerRead");
const LoginControllerRead = require("../controllers/info-pages/login/loginControllerRead");

// * Info pages

router.get("/", HomeControllerRead.getPage);

router.get("/sobre", SobreControllerRead.getPage);

router.get("/pacotes", PacoteControllerRead.getPage);

// * Cadastro

router.get("/cadastro", CadastroControllerRead.getPage);

// * Login

router.get("/login", LoginControllerRead.getPage)

module.exports = router;