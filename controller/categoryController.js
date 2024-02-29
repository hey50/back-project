
const CategoryModel=require('../models/category')
const uploadMedia =require('../middleware/cloudinaryConfig')



// router.post('/upload', upload.single('image'), function (req, res) {
   
//   });

// const createCategory =async(req,res)=>{
//     try{
//         const {title, imageUrl}= req.body
//         if(!title || ! imageUrl){
//             return res.status(500).json({message:"please provide category title or image"})
//         }
//         const newCategory = new CategoryModel({title,imageUrl})
//         await newCategory.save()
//         res.status(201).json({message:"category created"})
//     } catch (error){
// return res.status(500).json({message:"Error in create Category api"})
//     }

// }


const createCategory=async (req, res) => {
     
    const { title } = req.body;
    console.log("create Ctegory")
if(!title)
{
    return res.status(400).json({ message: 'Title is required' });

}




    try {
        const cloudinaryResult = await uploadMedia(req.file);
        console.log(cloudinaryResult)
        // const newContent = await CategoryModel.create({ title,imageUrl:req.file.path });
        const newCategory = await CategoryModel.create({
            title: req.body.title,
            imageUrl: cloudinaryResult.secure_url
            
        });
        res.json(newCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


const getAllCategory =async(req,res)=>{
    try{
const categories = await CategoryModel.find({})
if(!categories)
{
    return res.status(404).json({msg:"No Categories Found"})
}
res.status(200).json({success:true, totaleCategory:categories.length ,categories})
    }catch(error){
res.status(500).json({msg:"Error in get All category Api",error})
    }
}

const UpdateCategory = async(req,res)=>{
    try{
const {id}= req.params;
const {title,imageUrl}=req.body
const update = await CategoryModel.findByIdAndUpdate(id,{title,imageUrl},{new: true})
if(!update)
{
    return res.status(500).json({msg:"no category Found"})
}
res.status(200).json({msg:"category updated successfully"})
    }catch(error){
res.status(500).json({msg:"Error in update category Api",error})
    }
}


const deletecategory = async(req,res)=>{
    try{
const {id}=req.params
if(! id){
    return res.status(500).json({msg:"please provide category ID"})
}
const category = await CategoryModel.findById(id)
if(! category)
{
    res.status(500).json({msg:"No category found with this ID"})
}
await CategoryModel.findByIdAndDelete(id)
res.status(200).json({msg:"category Deleted successfully"})
    }catch(error){
        res.status(500).json({msg:"Error in Delete category Api",error})

    }
}








module.exports={
    createCategory,
    getAllCategory,
    UpdateCategory,
    deletecategory
}