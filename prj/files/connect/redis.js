import redis from "redis";

const red=redis;
export const cl=new red.createClient({
    host:"redis-server",
    port:6379
})

function redis_1(){
    const y=async()=>{
    const f=await cl.connect();
    const p=await f.get("valuessdsaxcsdfcd");
    if(p){
        console.log("found")
    }
    else{
        console.log("not found")
    }
    if(f){
        console.log("successfully connected to redis");
       return f;
    }
    else{
        console.log("not connected");
    }
}

const c=y();

console.log("promise is " + c);

}
export default redis_1;
