const express=require('express')
const router = express.Router();
const contentController = require('../controller/Contentcontroller')
const verifyJWT = require('../middleware/verifyJWT')
const roles = require('../middleware/roles')
const upload= require('../middleware/multer')

router.route('/content').post(verifyJWT,roles("admin"),upload.single("image"),contentController.createImage)
    
router.route('/getAllProduct').get(verifyJWT,contentController.getAllProducts)

router.route('/editcontent/:contentId').patch(verifyJWT,roles("admin"),contentController.UpdateContent)
    


router.route('/deletecontent/:contentId').delete(verifyJWT,roles("admin"),contentController.DeleteContent)
   
module.exports=router