const express = require("express")
const userRoute = express()
const addressController = require("../controllers/addressController")
const userController = require("../controllers/userController")
const userAuth = require('../middlewares/userAuth')
const multer = require("../middlewares/multer")
// registration

userRoute.get('/register',userAuth.isLogout,userController.loadRegister)
userRoute.post('/register',userController.insertUser)
userRoute.get('/otp',userAuth.isLogout,userController.loadOtp)
userRoute.post('/otp',userController.verifyOtp)
userRoute.get('/resendOtp',userAuth.isLogout,userController.resendOTP)

// user login
userRoute.get('/login', userController.loadLogin);
userRoute.post('/login', userController.verifyLogin);

// home page
userRoute.get('/', userController.loadHome);

userRoute.get("/items",userAuth.isLogin,userController.loadItems)
userRoute.get("/single-items",userAuth.isLogin,userController.singleItems)

// user profile
userRoute.get("/user-profile",userAuth.isLogin,userController.userProfile)
userRoute.get("/addressForm",addressController.loadAddAddress)
userRoute.post("/addAddress",addressController.addAddress)
userRoute.get("/editAddress",addressController.editAddress)
userRoute.post("/updateAddress",addressController.updateAddress)
userRoute.get("/deleteAddress/:id",addressController.deleteAddress)
userRoute.get("/editUser",userController.loadEditUser)
userRoute.post("/updateUser",userController.updateUser)
userRoute.get("/changePassword",userController.changePassword)
userRoute.post("/editPassword",userController.editPassword)
userRoute.post("/updateProfile",multer.uploadProfile.single('image'),userController.updateProfile)



// forget password

userRoute.get("/loadForget",userController.loadForgetPassword)
userRoute.post("/forgetOtp",userController.sendOtp)
userRoute.get("/forgetOtp",userController.loadOtpForget)
userRoute.get("/loadOtpForget",userController.enterOtp)
userRoute.get("/resetPassword",userController.loadReset)
userRoute.post("/resetPassword",userController.updatePassword)
userRoute.post("/verifyOtp",userController.verifyForget)



// // logout 

userRoute.get('/logout',userAuth.isLogin,userController.userLogout)






module.exports = userRoute