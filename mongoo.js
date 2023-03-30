const mongoo=require("mongoose")
mongoo.connect("mongodb://localhost:27017/E-com").then(()=>{

    console.log("data sucessfully connect")
 }).catch(()=>{
    console.log("no sucess")
 })
 const schema=new mongoo.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
 })

 
 const mode=new mongoo.model("content",schema)
module.exports=mode