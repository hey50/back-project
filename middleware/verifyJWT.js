const jwt=require('jsonwebtoken')

const verifyJWT = (req,res,next) =>{
const authHeader =req.headers.authorization || req.headers.Authorization
// console.log(authHeader+"sjkshdf")
if(!authHeader?.startsWith("Bearer "))
{
    return res.status(400).json({msg:"Unauthorized"})
}
// console.log(req.userId)
const token=authHeader.split(" ")[1]
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err) return res.status(403).json({msg:"forbidden"})
    req.user = decoded.user
    
console.log(decoded,"helloe")
    next()
})
}


module.exports=verifyJWT