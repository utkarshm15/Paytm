const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const userMiddleware = (req,res,next)=>{
        const auth = req.headers.authorization ;
        if(!auth || !auth.startsWith("Bearer ")){
            return res.status(403).json({});
        }
        const ar = auth.split(" ");
        try{
        const decoded = jwt.verify(ar[1],JWT_SECRET);
        req.userID = decoded.userID;
        next();
            }
        catch(err){
            return res.status(403).json({}); 
        }
}

module.exports = userMiddleware;