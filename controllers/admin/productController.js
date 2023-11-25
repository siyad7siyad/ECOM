const Product = require("../../model/productModel")
const Category = require("../../model/categoryModel")
const fs = require("fs")
const path=require('path')
const sharp = require("sharp")
// const express = require("express")




// load products
const gender = ["gents","ladies"]

const loadProducts = async(req,res)=>{

try {
  const products = await Product.find()
  const categories = await Category.find({},{_id:1,name:1})
  res.render("product.ejs",{categories,products})
  
} catch (error) {
  console.log(error.message);
}
 
}

// load product form

const loadProductForm = async(req,res)=>{
 try {
   
  let categories = await Category.find({})
  res.render('addProduct',{categories,gender})

 } catch (error) {
  console.log(error.message);
 }
}

// add product
const addProduct = async(req,res)=>{
  try {
      
      const image = req.files.map((x)=>x.filename)
      
      const {name,categoryData,price,discountPrice,productColor,gender,brand,description}=req.body
      const category=Category.find({category:categoryData})
      const sizedata = req.body.sizes
      const addProducts =new Product({
          name:name,
          category:categoryData,
          price:price,
          discount_Price:discountPrice,
          productColor:productColor,
          gender:gender,
          brand:brand,
          description:description,
          sizes:sizedata,
          image
      })
      await addProducts.save()
      res.redirect('/admin/products')
  } catch (error) {
      console.log(error.message)
  }
}

// edit product

const loadEditProduct = async(req,res)=>{
  try {
    const id = req.query.id
    const product = await Product.findById(id)
    let categories = await Category.find({})
    res.render("editProduct",{categories,gender,product})
    
  } catch (error) {
    console.log(error.message);
  }
}

// update product

const updateProduct = async(req,res)=>{
  try {

    
    const imageData = []
    const imageFiles = req.files

    for(const file of imageFiles){

      const randomInteger = Math.floor(Math.random() * 20000001);
      const imageDirectory = path.join('public', 'assets', 'imgs', 'productIMG');
      const imgFileName = "cropped" + randomInteger + ".jpg";
      const imagePath = path.join(imageDirectory, imgFileName);

// function of cropped image

        const cropImage = await sharp(file.path).resize(280,280,{
          fit:"cover",
        })
        .toFile(imagePath)

        if(cropImage){
          imageData.push(imgFileName)
        }
    }

    const {name,category,price,discountPrice,productColor,gender,brand,description} = req.body

    const sizedata =req.body.sizes
    if(imageData.length>0){
      await Product.findByIdAndUpdate({_id:req.body.product_id},{

        $set:{
          name,
            category,
            price,
            discount_Price:discountPrice,
            productColor,
            gender,
            brand,
            description,
            sizes:sizedata,
           image:imageData
        }
  
      })
    }else{
      await Product.findByIdAndUpdate({_id:req.body.product_id},{

        $set:{
          name,
            category,
            price,
            discount_Price:discountPrice,
            productColor,
            gender,
            brand,
            description,
            sizes:sizedata,
        }
  
      })
    }

    res.redirect('/admin/products')
    
  } catch (error) {
    console.log(error.message);
  }
}


// delete product

const deleteProduct = async(req,res)=>{
  try {
    
    const productId = req.params.id
    
    const result = await Product.findByIdAndDelete(productId)

    if(result && result.image !== ''){
      try {
        result.image.map((value)=> fs.unlinkSync("public/assets/imgs/productIMG" + value))
        
      } catch (error) {
        console.log(error.message);
      }
    }
    res.redirect("/admin/products")
    
  } catch (error) {
    console.log(error.message);
  }
}

// const deleteProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log(id, "kkkkkk");
//     const productData = await Product.findByIdAndUpdate(
//       { _id: id },
//       {
//         $set: {
//           is_listed: false,
//         },
//       }
//     );
//     res.redirect("/admin/products");
//   } catch (error) {
//     console.log(error.message);
//   }
// };



module.exports = {
  loadProducts,
  loadProductForm,
  addProduct,
  loadEditProduct,
  updateProduct,
  deleteProduct
}