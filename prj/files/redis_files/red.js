import { createClient } from "redis";
const r=createClient({
    host:"redis-server",
    port: 6379,
    
})

async function conn1(value){
    const g=await value.get("value");
    if(g){
        console.log("data is found");
    }
    else{
        console.log("cache not found")
    }
}
var hold=null;
async function conn2(value){
    const g=await value.get("value");
    if(g){
        console.log("data is found " + JSON.parse(g));
        const f=JSON.parse(g);
        f.forEach((j)=>{
            // console.log("json file is "+ j + "  for index "+ index)
            const l=Object.values(j);
            l.forEach((k,index)=>{
                if(index==3){
                    if(k==380){
                        console.log("item is " + l +" at index " + index);
                        hold=l;
                    }
                }
                // console.log("item is " + k +" at index " + index);
            })
        })
        return hold;
        
    }
    else{
        console.log("cache not found")
    }
}
async function conn3(value){
    const g=await value.get("value");
    if(g){
        console.log("data is found");
        const data=JSON.parse(g)
        const f=data.find((l)=>Object.values(l)[3]==380)
        if(f){
            console.log("find is " + f);
        }
    }
    else{
        console.log("cache not found")
    }
}
async function conn4(value){
    const g=await value.get("valueawda");
    if(g){
        console.log("data is found");
    }
    else{
        console.log("cache not found")
    }
}

async function call_red(){
    const d=await r.connect();
    const f=await conn2(d);
    await conn3(d);
    console.log("the value is " + f);
}

export default call_red;