const Users=require('../models/User')
const Joi = require('joi')
const getAllusers = async(req,res)=>{
const users= await Users.find().select("-password").lean()
if(!users)
{
    return res.status(400).json({msg:"No Users Found"})
}
res.json(users)
}


const GetUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await Users.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


const Updateuser = async (req, res) => {
    const  userId  = req.params.userId;
    const { username,roles } = req.body;

    try {
        const updatedUser = await Users.findByIdAndUpdate(userId, { username,roles},req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


const Deactivateuser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deactivatedUser = await Users.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        res.json(deactivatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


// "email":"monaa123@gmail.com",
    // "password":"123456666"


 const Deleteuser=async (req, res) => {
    const { userId } = req.params;

    try {
        await Users.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports={
    GetUserById,
    getAllusers,
    Deactivateuser,
    Updateuser,
    Deleteuser
}