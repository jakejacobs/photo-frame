const express = require('express')
const Product = require('../models/products')
const router = new express.Router()

const authCheck = (req,res,next) => {
    if(!req.user){
        return res.status(401).send("You are not authenticated!")
    } else {
        next()
    }
}

router.post('/products',authCheck,async (req,res)=>{
    
    
    const product =  new Product(req.body)
    try {
        await product.save()
        
        res.status(201).send({product})
    } catch(e){
        res.status(400).send(e)
    }
 })

 
 router.get('/products',authCheck,async (req,res)=>{
    console.log(req.user);
     try{
        const products =  await Product.find({})
        res.status(200).send(products)
     } catch(e){
         res.status(500).send(e)
     }
 })
 
 router.get('/products/:productId',authCheck,async (req,res)=>{
    const _id = req.params.productId
    try {
     const product =  await Product.findById(_id)
     if(!product){
         return res.status(404).send()
     }
     res.status(200).send(product)
    } catch (e) {
     res.status(500).send(e)
    } 
 })
 
 router.patch('/products/:productId',authCheck,async (req,res)=>{
     const _id = req.params.productId
 
     const updates = Object.keys(req.body)
     const allowedUpdates = ["name","is_available","available_cnt"]
     const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
 
     if(!isValidOperation){
         return res.status(400).send({'error':'Invalid Updates!'})
     }
 
     try {
         const product = await Product.findById(_id)
         updates.forEach((update)=>{
            product[update] = req.body[update]
         })
         await product.save()
    //   const product =  await Product.findByIdAndUpdate(_id,req.body,{ new:true, runValidators:true })
      if(!product){
          return res.status(404).send()
      }
      res.status(200).send(product)
     } catch (e) {
      res.status(400).send(e)
     } 
  })
 
  router.delete('/products/:productId',authCheck,async (req,res)=>{
     const _id = req.params.productId
     try {
         const product = await Product.findByIdAndDelete(_id)
         if(!product){
             return res.status(404).send()
         }
         res.status(200).send(product)
     } catch (e) {
         res.status(500).send(e)
     }
  })

  module.exports = router