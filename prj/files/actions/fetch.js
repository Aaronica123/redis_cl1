import { cl } from "../connect/redis.js";

async function fetch(req,res){
    const p=await cl.connect();
    console.log(p);
}
export default fetch;