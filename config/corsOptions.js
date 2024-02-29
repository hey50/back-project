const allawedOrigins=require('./allawedOrigin')


const corsOptions={
origin:(origin,callback)=>{
if(allawedOrigins.indexOf(origin)!==-1 ||!origin){
     callback(null,true)
}else{
    callback(new Error("Not allawed by Cors"))
}
},
credentials:true,
optionsSuccessStatus:200,
}


module.exports=corsOptions