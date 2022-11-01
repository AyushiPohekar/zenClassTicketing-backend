require("dotenv").config();
const express = require("express");
const cookiParser=require("cookie-parser")
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");


const app=express();
const port=process.env.port||8009;
require("./db/conn");

app.use(express.json());
app.use(cookiParser());
// app.use(cors());
app.options('*', cors());
app.use(router);

app.listen(port,()=>{
    console.log(`server started at port no:${port}`)
})