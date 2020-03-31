const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const complainSchema = new mongoose.Schema(
    {
        complain_id: {
            type: String
        },
        user_id:{
            type: ObjectId,
            ref: "Users",
        },
        car_number:{
            type: String
        },
        car_model:{
            type: String
        },
        complain_status:{
            type: Number
        },
        assign_police_id:{
            type:String
        }
    },
        { timestamps: true }   
);

module.exports = mongoose.model("complain", complainSchema);
