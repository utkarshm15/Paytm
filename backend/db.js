const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://utkarsh:a4qy4R6ZWQ1YM5kE@cluster0.lnv6wi7.mongodb.net/Paytm");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
});

const accountSchema = new mongoose.Schema({
    userID : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports = {
    User,
    Account
};