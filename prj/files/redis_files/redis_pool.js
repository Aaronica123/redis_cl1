import redis from 'redis';
const pl=redis.createClientPool({
    host:"redis-server",
    port:6379,
    maxclients:2,
})
const in1=redis.createClient({
    host:"redis-server",
    port:6379
})
const cl_in=async()=>{
    const cn=await in1.connect();
    if(cn){
        console.log("independent server");
    }
    else{
        console.log("server not connected");
    }
    
}

const y=async()=>{
    const conn=await pl.connect();
     if(conn){
        console.log("connection created 1")
    }
    else{
        console.log("denied created")
    }
}

const x=async()=>{
    const conn=await pl.connect();
    if(conn){
        console.log("connection created 2")
    }
    else{
        console.log("denied created")
    }
}
const z=async()=>{
    const conn=await pl.connect();
    if(conn){
        console.log("connection created 3")
    }
    else{
        console.log("denied created")
    }
    
}
const q=async()=>{
    const conn=await pl.connect();
    if(conn){
        console.log("connection created 4")
    }
    else{
        console.log("denied request")
    }
    
}
function call(){
    y();
    x();
    cl_in(); 
    // cl_in1();
    z();
    q();
}
export default call;
