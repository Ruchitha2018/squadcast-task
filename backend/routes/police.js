const express = require("express");
const router = express.Router();

//const { userById, complainById, policeAvailId, statusComplainById, updateComplainStatus, listComplains, checkComplainStatus, checkPoliceAvail, updatePoliceStatus, updateComplain } = require("../controllers/police");

const { userById, getUnresolvedComplain, complainById, unResolvedComplainId, listComplains, updateComplainStatus, updateComplain } = require("../controllers/police");

router.get("/list-complains/:userId", listComplains);
router.get("/get-unresolved-complain/:unResolvedComplainId", getUnresolvedComplain);
router.get("/update-complain-status/:complainId", updateComplainStatus);
router.get("/update-complain/(:userId)/(:unResolvedComplainId)", updateComplain);
//
//router.get("/police-avail/:policeAvailId", checkPoliceAvail);
//router.get("/updatePoliceStatus/:policeAvailId", updatePoliceStatus);
////router.get("/updateComplain/:policeAvailId/:complainById", updateComplainStatus);
//router.get("/checkComplainStatus/:statusComplainById", checkComplainStatus);

//router.param("policeAvailId", policeAvailId);
router.param("userId", userById);
router.param("unResolvedComplainId",unResolvedComplainId);
router.param("complainId", complainById);
//router.param("statusComplainById", statusComplainById)

module.exports = router;
