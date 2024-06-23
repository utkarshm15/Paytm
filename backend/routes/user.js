const {Router} = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userMiddleware = require("../middlewares");

const userRouter = Router();

const bodySchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
});

userRouter.post("/signup",async(req,res)=>{
    const {success} = bodySchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message : "Incorrect inputs"});
    }
    const existingUser = await User.findOne({username : req.body.username});
    if(existingUser){
        return res.status(411).json({message : "Email already taken"});
    }
    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    });

    await Account.create({
        userID : user._id,
        balance : 1 + Math.floor(Math.random()*1000)
    })
    
    const token = jwt.sign({userID : user._id},JWT_SECRET);
    return res.json({message : "User created successfully",
        token : token
    });
})

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
});

userRouter.post("/signin",async(req,res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message : "Invalid inputs"});
    }
    const user = await User.findOne({username: req.body.username,
        password : req.body.password
    });
    if(!user){
        return res.status(411).json({message : "Error while logging in"});
    }
    const token = jwt.sign({userID : user._id},JWT_SECRET);
    return res.json({
        message : "Logged in Successfully",
        token : token
    })
})

const updateBodySchema = zod.object({
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

userRouter.put("/",userMiddleware,async(req,res)=>{
    const {success} = updateBodySchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message : "Invalid Inputs"});
    }
    try{
    await User.updateOne({ _id : req.userID}, req.body);
    return res.json({message : "Profile updated successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(411).json({message : "Error while updating"});
    }
})

userRouter.get("/bulk",userMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [ {
            firstName : {'$regex' : filter ,'$options': 'i'}
        },
        {
            lastName : {'$regex' : filter , '$options': 'i'}
        }

        ]
});
    const filteredUsers = users.map((user)=>{
        return {firstName : user.firstName,
        lastName : user.lastName, 
        _id : user._id}});
    return res.json({user : filteredUsers});
})

module.exports = userRouter;