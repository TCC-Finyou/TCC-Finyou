const {Router} = require("express");
const router = Router();

const HomeControllerRead = require("../controllers/info-pages/homeControllerRead");
const SobreControllerRead = require("../controllers/info-pages/sobreControllerRead");

// * Home

router.get("/", HomeControllerRead.getPage);

router.get("/sobre", SobreControllerRead.getPage);

module.exports = router;