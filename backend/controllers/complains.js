const User = require("../models/users");
const Complain = require("../models/complains");

exports.complainById = (req, res, next) => {
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

exports.updateComplain = (req, res) => {
   
    Complain.findOneAndUpdate(
        { _id: req.complain._id },
        { $set: {assign_police_id: req.policeAvail._id} },
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

exports.checkComplainStatus = (req, res) => {
    return res.json(req.complain);
};

exports.addComplain = (req, res) => {
    const complain = new Complain(req.body);
    complain.save((err, data) => {
        if(err){
            return res.status(400).json({error:err});
        }
        res.json({data});
    });
}

exports.listComplains = (req, res, user_id) => {
    
    Complain.find({ user_id: req.profile._id })
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
