const {Router} = require("express");
const HomeControllerRead = require("../controllers/home/homeControllerRead");
const router = Router();

// * Home

router.get("/", HomeControllerRead.getHomePage);

module.exports = router;