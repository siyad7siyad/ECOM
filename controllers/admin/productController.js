const Product = require("../../model/productModel")
const Category = require("../../model/categoryModel")
const fs = require("fs")
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

const addProduct=async(req,res)=>{
  try{
    
    const image = req.files.map((x) => x.filename);

     const {name,categoryData,price,discountPrice,productColor,gender,brand,description}=req.body;
    //  console.log("Discount Price:", categoryData);
    const category= Category.find({category:categoryData});
    
    const sizedata=req.body.sizes

     const addProducts = Product({
      name,
      category:categoryData,
      price,
      discount_Price:discountPrice,
      productColor,
      gender,
      brand,
      description,
      sizes:sizedata,
     image
    })
    // console.log(addProducts,"kkkl");
    await addProducts.save();
console.log();
    res.redirect("/admin/products");  
  }
  catch(error){
 console.log(error.message);
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
    const image = req.files.map((x)=>x.filename)

    const {name,category,price,discountPrice,productColor,gender,brand,description} = req.body

    const sizedata =req.body.sizes
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
         image
      }

    })
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