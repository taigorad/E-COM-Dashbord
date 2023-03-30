const express = require("express")
const cors = require("cors")
const mode = require("./mongoo")
const jwt=require("jsonwebtoken")
const mode1=require("./model for product/product_model")
const app = express()
app.use(cors())

const port = process.env.PORT || 8000

app.use(express.json())

/*const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))*/

//u can use express.json inseted of body parser



app.post("/register", async (req, res) => {

  const user = new mode({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  let result = await user.save()



  //to delete the password from 
  result = result.toObject()
  delete result.password
  res.send(result)
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await mode.findOne({ email: req.body.email, password: req.body.password }).select("-password")
    console.log(user)
    if (user) {
      res.send(user)
    }
    else {
      res.send({ result: "no user found" })
    }

  }
  else {

    res.send({ result: "no user found" })

  }
})



//api for the product
app.post("/add-product",async(req,res)=>{
     const product=new mode1(req.body)
     let result=await product.save()
     res.send(result)
})

//for list the products

app.get("/products", async(req, res) => {
  let product=await mode1.find()
  if(product.length>0){
  res.send(product)
  }else{
    res.send({result:"no more product is here"})
  }
})


//for delete product
app.delete("/product/:id",async(req,res)=>{
  const result =await mode1.deleteOne({_id:req.params.id})
  res.send(result)
})

app.put("/update/:id", async (req,res)=>{
        
         const dele= await mode1.updateOne({_id:req.params.id},{$set:req.body})
         res.send(dele)
})
//for accesing single product
app.get("/product/:id",async(req,res)=>{
let result =await mode1.find({_id:req.params.id}).then((data)=>{
  res.send(data)
}).catch((err)=>{
  res.send("no result")
})
})
//for serching the data 
app.get("/search/:key",async(req,res)=>{
 let resutl= await mode1.find({"$or":[{price:{$regex:req.params.key}},
  {name:{$regex:req.params.key}},
  {category:{$regex:req.params.key}},
  {company:{$regex:req.params.key}}
]})
 res.send(resutl)


})

app.listen(port, () => {
  console.log("server start")
})