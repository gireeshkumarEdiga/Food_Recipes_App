const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required : true
    }

},{timestamps : true});

module.exports = mongoose.model("Users",signupSchema);