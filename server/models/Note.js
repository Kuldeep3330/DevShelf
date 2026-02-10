import mongoose from "mongoose";

const noteSchema= new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    file:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
},{
    timestamps:true
})

const Note= mongoose.model("Note", noteSchema)

export default Note