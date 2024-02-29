

const Content = require('../models/product');
const multer=require('multer')
const verifyJWT= require('../middleware/verifyJWT')
const jwt=require('jsonwebtoken');
const Category= require('../models/category')
const mongoose=require('mongoose')
const upload =require('../middleware/cloudinaryConfig')



const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Content.find().populate('category').exec();
        res.json(allProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

      
 const createImage=async (req, res) => {
   

    const category1 = await Category.findById(req.body.category)
    if(!category1)
    {
        return res.status(404).json({msg:"invalid category"})
    }

    const { title, description ,price,category} = req.body;
    

    try {
        const cloudinaryResult = await upload(req.file);

        const newContent = await Content.create({
            title: title,
            description : description,
            price: price,
            category :category,
            imageUrl: cloudinaryResult.secure_url
        })
        res.json(newContent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}



 const UpdateContent= async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({msg:"invalid product id"})
    }
    const category2 = await Category.findById(req.body.category)
    if(!category2)
    {
        return res.status(404).json({msg:"invalid category"})
    }
    const { contentId } = req.params;
    const { title, description, price,category} = req.body;

    try {
        const updatedContent = await Content.findByIdAndUpdate(contentId, { title, description, price,category}, { new: true });
        res.json(updatedContent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const DeleteContent =async (req, res) => {
    
    const { contentId } = req.params;

    try {
        await Content.findByIdAndDelete(contentId);
        res.json({ message: 'Content deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports={
    getAllProducts,
    createImage,
    UpdateContent,
    DeleteContent,
}
