// import {inv_obj} from "../models/inventory.js";
import { inv_md } from "../models/redis_model.js";

async function create_inv(req,res){
    try{
        const cl=new inv_md();
        cl.write(req,res);
    }
    catch(error){
        console.log(error.message);
    }
}

export default create_inv;