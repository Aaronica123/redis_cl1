import { inv_md } from "../models/redis_model.js";

async function read_inv(req,res){
    try{
        const cl=new inv_md();
        cl.read(req,res);
    }
    catch(error){
        console.log(error.message);
    }
}
export default read_inv;