const {Router} = require("express");
const router = Router();

const HomeControllerRead = require("../controllers/info-pages/homeControllerRead");
const SobreControllerRead = require("../controllers/info-pages/sobreControllerRead");
const PacoteControllerRead = require("../controllers/info-pages/pacoteControllerRead");

// * Info pages

router.get("/", HomeControllerRead.getPage);

router.get("/sobre", SobreControllerRead.getPage);

router.get("/pacotes", PacoteControllerRead.getPage)

module.exports = router;