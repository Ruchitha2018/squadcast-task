const User = require("../models/users");
const Complain = require("../models/complains");


//Get Police Details
exports.policeById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Police not found"
            });
        }
        req.police = user;
        next();
    });
}

//Get Unresolved Complain Detail
exports.unResolvedComplainById = (req, res, next) => {
    Complain.findOne({complain_status:0, assign_police_id:"0"}).exec((err, complain) => {
        if(err || !complain){
            return res.status(400).json({
                error: "Complain not found"
            });
        }
        req.complain = complain;
        next();
    });
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

//Car Stolen Complains List based on Police ID.
exports.listComplains = (req, res) => {
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


//Get Unresolved Complain
exports.getUnresolvedComplain = (req, res) => {
    return res.json(req.complain);
};

//Get Police Details
exports.policeDetail = (req, res) => {
    return res.json(req.police);
}

//Update Complain Status after case resolved
exports.updateComplainStatus = (req, res) => {
    Complain.findOneAndUpdate(
        { _id: req.complain._id },
        { $set: {complain_status:1} },
        { new: true },
        (err, complain) => {
            if (err) {
                return res.status(400).json({
                    error: "Complain Status Not Resolved"
                });
            }
            res.json(complain);
        }
    );
};

//Update Complain Police Assigned Id
exports.updateComplainAssign = (req, res) => {
    Complain.findOneAndUpdate(
        { _id: req.complain._id },
        { $set: {assign_police_id: req.police._id} },
        { new: true },
        (err, complain) => {
            if (err) {
                return res.status(400).json({
                    error: "DB ERROR"
                });
            }
            res.json(complain);
        }
    );
}

//Update Police Status
exports.updatePoliceStatus = (req, res) => {
    console.log(req.params.status);
    User.findOneAndUpdate(
        {_id:req.params.Id},
        { $set: { user_status:req.params.status} },
        { new: true },
        (err, user) => { 
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            return res.json(user);
        });
}