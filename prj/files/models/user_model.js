import mongoose from "mongoose";

const user_model=mongoose.Schema({
    user_id:{
        required:true,
        unique:true,
        type:Number
    },
    user_name:{
        required:true,
        unique:true,
        type:String
    }
})

const user_obj=mongoose.model("red_user",user_model);
export default user_obj;