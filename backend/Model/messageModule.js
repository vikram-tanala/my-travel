import mongoose from "mongoose";

const messageModel=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    message:{type:String,required:true},
})

export default mongoose.model("Message",messageModel);