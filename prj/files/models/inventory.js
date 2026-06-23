import {Schema,model} from "mongoose";


const inv=Schema({
    inv_id:{
        type:Number,
        required:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true,
        minlength:0
    },
    inv_name:{
        type:String,
        required:true,
        unique:true
    }
})

const inv_obj=model("inv_model",inv);
export default inv_obj;