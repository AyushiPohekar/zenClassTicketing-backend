require("dotenv").config();
const express = require("express");
const cookiParser=require("cookie-parser")
require("./db/conn");
const usersRouter = require("./routes/users.router");
const queryRouter = require("./routes/query.router");
const mentorRouter = require("./routes/mentor.router");


const cors = require("cors");


const app=express();
const port=process.env.port||8009;
require("./db/conn");

app.use(express.json());
app.use(cookiParser());
 app.use(cors());


 //routers
app.use('/',usersRouter);

 app.use('/queries',queryRouter);
 app.use('/mentor/queries',mentorRouter);


app.listen(port,()=>{
    console.log(`server started at port no:${port}`)
})