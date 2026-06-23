import redis from "../models/redis_model.js";

async function fetch_red(req,res){
    try{
        const obj=new redis();
        obj.read(req,res);

    }
    catch(error){
        console.log(error.message);
    }
}

export default fetch_red;