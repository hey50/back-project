const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { use } = require('../routes/root');

const register =async (req,res) => {
    const { username,
        email,
        password,
        phone,
        gender,
        roles } =req.body;
        console.log("hello")
        const foundUser = await User.findOne({ email }).exec();
        if(foundUser)
        {
         return   res.status(401).json({msg:"user already exists"})
        }
const hashedPassword = await bcrypt.hash(password,10)
const user=await User.create({
    username,
    email,
    password:hashedPassword,
    phone,
    gender,
    roles
})
const accessToken=jwt.sign({
   user
},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"60d"})

const refreshToken = jwt.sign({
    user
},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"90d"})
res.cookie("jwt",refreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:"None",
    maxAge: 90*24*60*60*1000
})
res.json({accessToken,email:user.email,username:user.username})
}

const login=  async(req,res)=>{
    const {email,password}=req.body
    if(!email || ! password)
    {
        return res.status(400).json({msg:'All Fields are required'})
    }
    const foundUser = await User.findOne({ email }).exec();
        if(!foundUser)
        {
         return   res.status(401).json({msg:"user Does Not exists"})
        }
        const match = await bcrypt.compare(password,foundUser.password)
        if  (!match)
        {
            return res.status(401).json({msg:"Wrong Password"})
        }
    req.user = foundUser
    // console.log("req.iuesrjxhsjdd ",req.user)
    const accessToken = jwt.sign({
            user:foundUser,
            roles: foundUser.roles
           
           
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"60d"})
        console.log(foundUser._id)
        const refreshToken = jwt.sign({
            UserInfo:{
                id:foundUser._id
            }
        },process.env.REFRESH_TOKEN_SECRET,{expiresIn:"90d"})
        res.cookie("jwt",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge: 90*24*60*60*1000
        })
        res.json({accessToken,email:foundUser.email,roles: foundUser.roles})
}


const refresh = (req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt)
    {
      return  res.status(401).json({msg:"Unauthorized"})
    }
    const refreshToken=cookies.jwt
jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,async(err,decoded)=>{
    if(err) return res.status(403).json({msg:"forbidden"})
    const foundUSer= await User.findById(decoded.UserInfo.id).exec()
if(!foundUSer) return  res.status(401).json({msg:"Unauthorized"})
    const accessToken=jwt.sign({
        UserInfo:{
            id:foundUSer._id
        }
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"60d"})
    re.json({accessToken})
    
})

}


const logout = (req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie("jwt",
    {httpOnly :true,
    sameSite: "None",
    secure: true,
    })
    res.json({msg:"cookie cleared ,loged out successfully"})
}

module.exports={
    register,
    login,
    refresh,
    logout
}