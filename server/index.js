const express = require('express');
const env = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app =express();
const port =8000;


//database connect
mongoose.connect('mongodb://127.0.0.1/loginauth',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Databse Connected"))
.catch((err)=>console.log("Database not connected",err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))



app.use('/',require('./routes/authRoutes'))


app.listen(port, () => console.log(`server is running on ${port}`));