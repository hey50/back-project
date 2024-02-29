const express=require('express')
const router = express.Router();
const category = require('../controller/categoryController')
const verifyJWT = require('../middleware/verifyJWT')
const roles = require('../middleware/roles')
const upload= require('../middleware/multer')
const cloudinaryConfig =require('../middleware/cloudinaryConfig')

// router.route('/createCategory').post(verifyJWT,roles("admin"),category.createCategory)
  router.route('/createCategory').post(verifyJWT,roles("admin"),upload.single("image"), category.createCategory)

    router.route('/getAll').get(verifyJWT,category.getAllCategory)


router.route('/updateCategory/:id').put(verifyJWT,roles("admin"),category.UpdateCategory)

router.route('/delete/:id').delete(verifyJWT,roles("admin"),category.deletecategory)
    


// router.route('/content/:contentId').delete(verifyJWT,roles("admin"),contentController.DeleteContent)
   
module.exports=router