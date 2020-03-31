const express = require("express");
const router = express.Router();

const { addComplain, listComplains, complainById, checkComplainStatus, updateComplain } = require("../controllers/complains");
const { userById, policeAvailId, updatePoliceStatus, policeAvail } = require("../controllers/user");

router.post("/add", addComplain);
router.get("/list/:userId", listComplains);
router.get("/policeAvail/:policeAvailId", policeAvail);

router.get("/updatePoliceStatus/:policeAvailId", updatePoliceStatus);
router.get("/updateComplain/:policeAvailId/:complainById", updateComplain);
router.get("/checkComplainStatus/:complainById", checkComplainStatus);

router.param("complainById", complainById);
router.param("policeAvailId", policeAvailId);
router.param("userId", userById);

module.exports = router;
