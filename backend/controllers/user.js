const User = require("../models/users");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    })
}

exports.policeAvailId = (req, res, next) => {
    User.findOne({user_status:0, user_type:1}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.policeAvail = user;
        next();
    });
}

exports.policeAvail = (req, res) => {
    return res.json(req.policeAvail);
};

exports.updatePoliceStatus = (req, res) => {
    console.log(req.policeAvail);
    User.findOneAndUpdate(
        {_id:req.policeAvail._id},
        { $set: { user_status:1} },
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
