require('dotenv').config() 



const express = require('express');

const app = express();

const connectDB=require('./config/dbconnect')
const mongoose=require('mongoose')
const cookieParses=require('cookie-parser')
const cors=require('cors');
// const corsOptions = require('./config/corsOptions');
const morgan = require('morgan');



const PORT=process.env.PORT||5000

connectDB()
app.use(morgan('dev'));

// app.use(cors({
// origin:"http//:localhost:4200",
// credentail:true,
// methods:['GET','POST','PUT','DELETEe','PATCH']
// }))

app.use(cors())
app.use(cookieParses())
app.use(express.json())
app.use('/',require('./routes/root'))
app.use('/auth',require('./routes/authRoutes'))
app.use('/users',require('./routes/userRouter'))
app.use('/cont',require('./routes/contentRouter'))
app.use('/category',require('./routes/CategoryRouter'))
mongoose.connection.once("open",()=>{
    console.log("connected to mongoDb")
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
})

mongoose.connection.on("error",(err)=>{
console.log(err)
})




