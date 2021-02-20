const express=require("express");
const app=express();
// cros跨域
app.all("*",function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();  
});
let url=require('url');
let body_parser=require("body-parser")
app.use(body_parser.urlencoded({
    extended: false
}))
let mongoose=require("mongoose");
mongoose
 .connect("mongodb://localhost/item",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 .then(()=>{
     console.log("连接数据库成功");
 })
 .catch((err)=>{
     console.log(err);
 })
 const iteSchema=new mongoose.Schema({
     username:String,
     password:String
 })
 let ite =mongoose.model("ite",iteSchema);
 app.get("/register",(req,res)=>{
    let obj=url.parse(req.url,true).query;
    ite.find({username:obj.username}).then(data=>{
        if(data.length==0){
            ite.create(obj).then(result=>{
                result?res.end("注册成功"):null;
            })
        }else{
            res.send({
                status:false,
                msg:'手机号已经注册过了，请您去登陆'
            })
        }
    })
 })
 app.get("/login",(req,res)=>{
     ite.find({username:req.query.username,password:req.query.password}).then(data=>{
         console.log(data);
         data.length==0?res.end("登录失败"):res.end("登录成功")
     })
 })
 app.listen("6060",()=>{
     console.log("6060 is runing");
 })