const User = require("../models/users");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
require("dotenv").config();

exports.signup = (req, res) => {
     console.log("req.body", req.body);

    const user = new User(req.body);
    console.log(req.body);
    user.save((error, user) => {
        if(error){
            return res.status(400).json({error:error});
        }
          user.salt = undefined;
          user.hashed_password = undefined;
        console.log(user);
        res.json({user});
    })
};


exports.signin = (req, res) => {
    //Find the user based on email
    const { user_email, user_password } = req.body;
    console.log(user_email);
    User.findOne({ user_email }, (error, user) => {
        if(error || !user){
            return res.status(400).json({error: "User with that email does not exist. Please signup"});
        }
        //Email and Password must match
        console.log(user);
        if(!user.authenticate(user_password)){
            return res.status(401).json({error: "Password does not match"});
        }
        
        //Token => User ID and Secret
        console.log(process.env.SECRET);
        const token = jwt.sign({_id:user._id}, process.env.SECRET);
        res.cookie("t", token, {expire:new Date()+99999});
        return res.json({token, user:user._id, role:user.user_type, status:user.user_status});
    })
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({message: "Signout Successfully"});
}

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && (req.profile._id == req.auth._id);
    if(!user){
        return res.status(403).json({error: "Access Denied"});
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.user_type === -1){
        return res.status(403).json({error:"Admin Resource! Access denied"});
    }
    next();
}
exports.isPoliceOfficer = (req, res, next) => {
    if(req.profile.user_type === 1){
        return res.status(403).json({error:"Police Officer Resource! Access denied"});
    }
    next();
}
exports.isUser = (req, res, next) => {
    if(req.profile.user_type === 0){
        return res.status(403).json({error:"User Resource! Access denied"});
    }
    next();
}
////
//exports.requireSignin = expressJwt({
//    secret: process.env.SECRET,
//    userProperty: "auth"
//});
