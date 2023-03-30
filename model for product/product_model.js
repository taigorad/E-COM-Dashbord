const mongoo=require("mongoose")
mongoo.connect("mongodb://localhost:27017/E-com").then(()=>{

    console.log("data sucessfully connect")
 }).catch(()=>{
    console.log("no sucess")
 })
 const schema_for_product=new mongoo.Schema({
    name:{type:String},
    price:{type:String},
    category:{type:String},
    userId:{type:String},
    company:{type:String}

 })

 
 const mode=new mongoo.model("product",schema_for_product)
module.exports=mode