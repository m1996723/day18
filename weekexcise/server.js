const express=require("express");
const http=express();
const Db=require("./db.js");
const db=new Db("hope");
const bodyParser=require("body-parser");
http.use(bodyParser.urlencoded({extended:false}));

http.listen(8080,()=>{
	console.log("run");
})

http.use(express.static("./public"));

//获取所有数据
http.get("/msg",(req,res)=>{
	db.find("student",{},(err,data)=>{
		res.send(data);
	})
})

//添加一条数据
http.post("/aHope",(req,res)=>{
	db.insertOne("student",req.body,(err,data)=>{
		if(err){
			res.send(err);
		}else{
			res.send("insertOne");
		}
	})
});

//删除一条数据
http.get("/del",(req,res)=>{
	db.deleteById("student",req.query.id,(err,data)=>{
		res.send("deleteOne")
	})
})

//修改一条数据
http.get("/update",(req,res)=>{
	db.findById("student",req.query.id,(err0,data0)=>{
		if(err0){
			res.send("未找到该条数据")
		}else{
			data0.succ=1;
			db.updateById("student",req.query.id,data0,(err,data)=>{
				if(err){
					res.send("修改发生错误");
				}else{
					res.send("updateOne");					
				}
			})
		}
	})
})

