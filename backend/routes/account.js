const {Router} = require("express");
const userMiddleware = require("../middlewares");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter  = Router();


accountRouter.get("/balance",userMiddleware,async(req,res)=>{
    const userID = req.userID;
    const account = await Account.findOne({userID : userID});
    res.json({
        balance : account.balance
    })
})

accountRouter.post("/transfer",userMiddleware,async(req,res)=>{
    //creating a transaction so that if any problem occurs during transfer then the payment rolls back

    const session = await mongoose.startSession();
    session.startTransaction();
    
    const {amount , to} = req.body;
    const account = await Account.findOne({userID : req.userID}).session(session);
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        });
    }

    try{
        await Account.updateOne({userID : req.userID},{$inc : {balance : -amount}}).session(session)
        await Account.updateOne({userID : to}, {$inc : {balance : amount}}).session(session);
    }
    catch(err){
        console.log(err);
        await session.abortTransaction();
    }

    await session.commitTransaction();
    res.json({message : "Transfer successful"});

})

module.exports = accountRouter;