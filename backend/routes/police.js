const express = require("express");
const router = express.Router();


const { policeById, unResolvedComplainById, complainById, listComplains, getUnresolvedComplain, updateComplainStatus, updateComplainAssign, policeDetail, updatePoliceStatus } = require("../controllers/police");

router.get("/list/:policeId", listComplains);
router.get("/get-unresolved-complain/:unResolvedComplainId", getUnresolvedComplain);
router.get("/update-complain-status/:complainId", updateComplainStatus);
router.get("/update-complain-assign/(:policeId)/(:unResolvedComplainId)", updateComplainAssign);
router.get("/update-police-status/(:Id)/(:status)", updatePoliceStatus);
router.get("/police-detail/:policeId", policeDetail);

router.param("policeId", policeById);
router.param("unResolvedComplainId", unResolvedComplainById);
router.param("complainId", complainById);

module.exports = router;
