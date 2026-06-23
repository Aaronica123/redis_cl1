import redis from "../models/redis_model.js";

async function update(req,res){
    try{
        const cl=new redis();
        cl.update(req,res);
    }catch(error){
        console.log(error.message);
    }
}

export default update;