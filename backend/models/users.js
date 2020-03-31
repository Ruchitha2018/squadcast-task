const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
        },
        user_email: {
            type: String
        },
        user_phone: {
            type: Number
        },
        salt: String,
        user_type: {
            type: Number
        },
        user_status: {
            type: Number
        },
        hashed_password: {
            type: String
        }
    },
    { timestamps: true }   
);

//virtual fields

userSchema.virtual("user_password").set(function(password){
    console.log(password);
   this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
}).get(function(){
    return this._password;
});

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

   encryptPassword: function(password){
       if(!password) return "";
       try{
           return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
       }catch(err){
           console.log(err);
       }
   }  
};

module.exports = mongoose.model("user", userSchema);
