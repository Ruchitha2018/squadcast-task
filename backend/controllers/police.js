const User = require("../models/users");
const Complain = require("../models/complains");

//Get Police Details
exports.userById = (req, res, next, id) => {
    console.log(id);
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            });
        }
        console.log(user);
        req.police = user;
        next();
    });
}

//Get Unresolved Complain Detail
exports.unResolvedComplainId = (req, res, next) => {
    Complain.findOne({complain_status:0, assign_police_id:"0"}).exec((err, complain) => {
        if(err || !complain){
            return res.status(400).json({
                error: "Complain not found"
            });
        }
        req.complain = complain;
        next();
    })
}

//Get Unresolved Complain
exports.getUnresolvedComplain = (req, res) => {
    return res.json(req.complain);
};

//Get Complain Details
exports.complainById = (req, res, next, id) => {
    Complain.findById(id).exec((err, complain) => {
        if(err || !complain){
            return res.status(400).json({
                error: "Complain Not Found"
            });
        }
        req.complain = complain;
        next();
    });
}
//
//Update Complain Status after case resolved
exports.updateComplainStatus = (req, res) => {
   
    Complain.findOneAndUpdate(
        { _id: req.complain._id },
        { $set: {complain_status:1} },
        { new: true },
        (err, complain) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            res.json(complain);
        }
    );
};
//Update Complain Police Assigned Id
exports.updateComplain = (req, res, id) => {
   console.log(id);
    Complain.findOneAndUpdate(
        { _id: req.complain._id },
        { $set: {assign_police_id: req.police._id} },
        { new: true },
        (err, complain) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            res.json(complain);
        }
    );
}

//
////GET Police ID after Police has resolved the case/Check Police is available
//
//exports.policeAvailId = (req, res, next) => {
//     User.findOne({ user_type:"1", user_status:"0" }).exec((err, user) => {
//        if(err || !user){
//            return res.status(400).json({
//                error: "Complain Not Found"
//            });
//        }
//        console.log(user);
//        req.police = user;
//        next();
//    });
//};

////GET NEW Police Details after Police has resolved the case
//exports.checkPoliceAvail = (req, res) => {
//    return res.json(req.police);
//};





//Car Stolen Complains List based on Police ID.
exports.listComplains = (req, res) => {
    console.log(req.police);
    let police_id = req.police._id.toString();
    Complain.find({ assign_police_id : police_id })
        .sort("-created")
        .exec((err, complains) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(complains);
        });
};
////update Police Status --> 0 to 1 (Available)
//exports.updatePoliceStatus = (req, res) => {
//    console.log(req.police);
//    User.findOneAndUpdate(
//        {_id:req.police._id},
//        { $set: { user_status:1} },
//        { new: true },
//        (err, user) => { 
//            if (err) {
//                return res.status(400).json({
//                    error: "You are not authorized to perform this action"
//                });
//            }
//            return res.json(user);
//        });
//}