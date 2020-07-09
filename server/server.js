require("dotenv").config();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
});

//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const app = require("./app");

app.listen(port, () => {
    console.log("Server listening on port: "+port);
});