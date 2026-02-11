import express from 'express'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router=express.Router()

router.post('/register', async (req, res)=>{
    const {username, password}= req.body

    if(!username || !password) res.status(400).json({message:'username n password required'})

    const hashedPassword=await bcrypt.hash(password, 10)
    const user= new User({username, password:hashedPassword})
    await user.save()

    res.status(201).json({message:"user registered"})
})

router.post('/login', async (req, res)=>{
    const {username, password}=req.body

    const user= await User.findOne({username})
    if(!user) return res.status(404).json({message:'user not found'})
    
    const isMatch= await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: "Wrong password" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });

})

export default router