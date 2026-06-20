import redis from 'redis';
const pl=redis.createClientPool({
     url: 'redis://localhost:6379',
    maxClients:5,
})

const in1=redis.createClient({
    host:"redis-server",
    port:6379
})
const cl_in=async()=>{
    const cn=await in1.connect();
    if(cn){
        console.log("independent server" + in1);
    }
    else{
        console.log("server not connected");
    }
    
}
var c=1;

const y=async()=>{
    const conn = pl;
    
     if(conn){
        console.log("connection created 1");
         console.log(conn);
         
    }
    else{
        console.log("denied created")
    }
}

const x=async()=>{
   
    const conn=await pl.connect();
    if(conn){
        console.log("connection created 2");
         console.log(c+1);
    }
    else{
        console.log("denied created");
        console.log(conn);
    }
}
// const z=async()=>{
//     const conn=await pl.connect();
//     if(conn){
//         console.log("connection created 3")
//         console.log(c++);
//     }
//     else{
//         console.log("denied created")
//     }
    
// }
// const q=async()=>{
//     const conn=await pl.connect();
//     if(conn){
//         console.log("connection created 4")
//          console.log(c++);
//     }
//     else{
//         console.log("denied request")
//     }
    
// }
async function call(){
    await Promise.all([
    y(),
    x(),
    cl_in(), 
    // cl_in1();
    // z(),
    // q()
    ]);
    
}
export default call;
