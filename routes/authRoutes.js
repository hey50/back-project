const express=require('express')
const router=express.Router()
const validationMiddleware = require('../middleware/validationSchema');
const authcontroller = require('../controller/authcontroller')

router.route('/register').post(validationMiddleware,authcontroller.register)
router.route('/login').post(authcontroller.login)
router.route('/refresh').get(authcontroller.refresh)
router.route('/logout').post(authcontroller.logout)

module.exports=router