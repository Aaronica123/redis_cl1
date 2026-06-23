import redis from "../models/redis_model.js";

async function create_item(req,res){
    try{
        const cl=new redis();
        cl.write(req,res);
    }
    catch(error){
        console.log(error.message);
    }
}

export default create_item;