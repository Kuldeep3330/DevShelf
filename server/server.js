import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const app=express()

app.use(express.json())
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/notes.routes.js";

app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes);

app.get('/',(req, res)=>{
    res.send('hello owlrd')
})

app.listen(5000, ()=>{
    console.log("Server running on http://localhost:5000");
    
})