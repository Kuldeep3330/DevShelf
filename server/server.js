import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app=express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes)

app.get('/',(req, res)=>{
    res.send('hello owlrd')
})

app.listen(5000, ()=>{
    console.log("Server running on http://localhost:5000");
    
})