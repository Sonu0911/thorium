const express = require('express');
const router = express.Router();
const CowinController = require("../controllers/cowinController")
const weatherController = require("../controllers/weatherController")


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/getList", CowinController.getList)
router.get("/getCities", weatherController.getCities)

router.post("/memes", weatherController.memes)


module.exports = router;