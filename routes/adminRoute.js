const express = require("express")
const adminRoute = express()
const adminController = require('../controllers/admin/adminController')
const categoryController = require('../controllers/admin/categoryController')
const multer = require("../middlewares/multer")
const productController = require("../controllers/admin/productController")

const adminAuth = require('../middlewares/adminAuth')
adminRoute.set("views","./views/admin")

// login

adminRoute.get('/',adminAuth.isLogout,adminController.loadAdminLogin)
adminRoute.post('/',adminController.verifyLogin)

// home

adminRoute.get('/home',adminAuth.isLogin,adminController.loadHome)

// user

adminRoute.get("/userData",adminAuth.isLogin,adminController.loadUserPage)
adminRoute.get("/listUser",adminAuth.isLogin,adminController.listUser)
adminRoute.get("/unlistUser",adminAuth.isLogin,adminController.unlistUser)



//add edit update listed unlisted category

adminRoute.get('/category',adminAuth.isLogin,categoryController.loadCategory)
adminRoute.get('/addcategory',adminAuth.isLogin,categoryController.loadCategoryForm)
adminRoute.post('/addcategory',multer.uploadCategory.single('image'),categoryController.addCategory)
adminRoute.get('/editcategory',adminAuth.isLogin,categoryController.loadEditCategory)
adminRoute.post('/editcategory',multer.uploadCategory.single('image'),categoryController.updateCategory)
adminRoute.get('/unlistCategory',adminAuth.isLogin,categoryController.unlistCategory)
adminRoute.get('/listCategory',adminAuth.isLogin,categoryController.listCategory)


//add products

adminRoute.get("/products",adminAuth.isLogin,productController.loadProducts)
adminRoute.get("/addProduct",adminAuth.isLogin,productController.loadProductForm)
adminRoute.post("/addProduct",multer.uploadProduct.array('image'),productController.addProduct)
adminRoute.get("/editProduct",adminAuth.isLogin,productController.loadEditProduct)
adminRoute.post("/editProduct",multer.uploadProduct.array('image'),productController.updateProduct)
adminRoute.get("/deleteProduct/:id",adminAuth.isLogin,productController.deleteProduct)


// logout

adminRoute.get('/logoutAdmin',adminAuth.isLogin,adminController.adminLogout)




module.exports = adminRoute
