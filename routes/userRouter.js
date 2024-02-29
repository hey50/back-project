const express=require('express')
const router=express.Router()
const userController=require('../controller/Users')
const verifyJWT = require('../middleware/verifyJWT')
const roles = require('../middleware/roles')
const validationMiddleware=require('../middleware/validationSchema')
const ensureActiveUser = require('../middleware/ActiveUser')

router.use(verifyJWT)
router.use(roles("admin"))
router.route('/').get(userController.getAllusers)
router.route('/userOFid/:userId').get(userController.GetUserById)
router.route('/updateuser/:userId').patch(userController.Updateuser )


router.route('/deactivateuser/:userId/').patch(ensureActiveUser,userController.Deactivateuser) 

router.route('/deleteuser/:userId').delete(userController.Deleteuser)


module.exports=router