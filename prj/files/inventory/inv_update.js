import { inv_md } from "../models/redis_model.js";

async function update_inv(req,res){
    try{
        const cl=new inv_md();
        cl.update(req,res);
    }
    catch(error){
        console.log(error.message)
    }
}

export default update_inv;