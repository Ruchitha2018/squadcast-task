const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const complainRoutes = require("./routes/complains");
const authRoutes = require("./routes/auth");
const policeRoutes = require("./routes/police"); 

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
   useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log("DB Connected"));

console.log(process.env.DATABASE);
console.log(process.env.SECRET);


app.get("/", (req,res) => {
    res.send("Hello from node");
});


app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api/complain", complainRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/police", policeRoutes);

const port = process.env.PORT || 8000;

app.listen(port,() =>{
    console.log("Server is running");
});
