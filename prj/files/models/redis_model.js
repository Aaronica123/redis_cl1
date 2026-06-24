import { createClient } from "redis";

import user_obj from "./user_model.js";
var c=null;
const redis_con=createClient({
        port:6379,
        host:"redis-server",
        "maxmemory-policy":"allkeys-lfu"
    })

class redis{
    async connect_red(){
        // console.log("c is type "+ c);
        if(c){
            return c;
        }
        else{
        console.log("attempt connect")
        const f=await redis_con.connect();
        // const p=await f.json.get("invmain");
        // const p1=await f.json.get("invmain","$[?(@.inv_id==100)]");
        // console.log("item p "+p1);
        //console.log(p);
        c=f;
        return f;
        }
    }
   async read(req,res){
    try{
    const da=await this.connect_red();
    const fetch=await da.get("data");
    if(fetch){
        const obj=JSON.parse(fetch);
        return res.status(200).json({"message":"data fetched from cache",
            "data":obj
        })
    }
    else{
        const cr=await user_obj.find({});
        const mk=await da.set("data",JSON.stringify(cr));
        await da.expire("data",60);
        if(mk&&cr){
           return res.status(200).json({"message":"fetched from database",
            "data":cr
        })
        }
        else{
            return res.status(500).json({"message":"failed to fetch"})
        }
         }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({"message":error.message})
    }
    }
    
    async write(req,res){
        try{
        const data=await this.connect_red();
        console.log("1");
        const j=await data.json.get("invmain","$");
        console.log('2');
        const {inv_id,amount,inv_name}=req.body;
        console.log(inv_id + "" + amount+" "+inv_name);
        console.log(j);
        if(j){
            console.log("found");
            // const j_son=JSON.parse(j);
            // console.log("this is "+ j_son);
            console.log("body is "+ j);

            const ind=await j.find(l=>Object.values(l)[0]==inv_id);
            if(ind){
                return res.status(409).json({"message":"Data is created"})
            }
            else{
                const aw=await data.json.arrAppend("invmain","$",{"inv_id":inv_id, "amount":amount,"inv_name":inv_name})
                if(aw){
                    return res.status(201).json({"message":"item created"})
                }
                else{
                    return res.status(500).json({"message":"failed to create"})
                }
            }

        }
        else {
            console.log("not found");

            const cr=await data.json.set("invmain","$",[]);
            console.log("made 1");
            console.log(cr);
            if(cr){
                console.log("created array")
                const c=await data.json.arrAppend("invmain","$",
                    {"inv_id":inv_id , "amount":amount , "inv_name":inv_name});
                // json.set l $[?(@.user>1)] '{"age":5}'
                if(c){
                    return res.status(201).json({"message":"the item is created"});
                }
                else{
                    return res.status(500).json({"message":"failed to create"})
                }
            }
            else{
                return res.status(500).json({"message":"the array is not created"});
            }
        }
        }
        catch(error){
            console.log(error.message);
        }
    }
    async update(req,res){
        try{
            const data=await this.connect_red();
            const {inv_id}=req.body;
            console.log(inv_id)
           
             const gt = await data.json.get(`invmain`, {
            path: `$[0]`
        });
            // const gt1 = await data.json.get("invmainwed");
           console.log(gt);
            //console.log(gt1)
        }
        catch(error){
            console.log(error.message);
        }
    }


}

export class inv_md extends redis {
async write(req,res){
    const d=await this.connect_red();
    const {inv_id}=req.body;
    if(d){
        console.log("connected");
        const j=await d.json.get("inventory");
        if(j){
            const da=await d.json.get("inventory",{path:`$.[?(@.inv_id==${inv_id})]`});
            if(da.length>0){
                console.log(da);
                return res.status(409).json({"message":"This item already exists"});
            }
            else{
                const ar=await d.json.arrAppend("inventory","$",{"inv_id":inv_id})
                if(ar){
                    return res.status(201).json({"message":"Inventory item recorder"})
                }
                else{
                    return res.status(500).json({"message":"inventory failed to create"})
                }
            }
        }
        else{
            const cr=await d.json.set("inventory","$",[]);
            if(cr){
            const set=await d.json.arrAppend("inventory","$",{"inv_id":inv_id});
            if(set){
                return res.status(201).json({"message":"cache created and recorded"})
            }
            else{
                return res.status(500).json({"message":"failed to append"})
            }
        }
        else{
            return res.status(500).json({"message":"failed to create array"})
        }
        }
    }
    else{
        console.log("cannot connect");
        return res.status(500).json({"message":"Redis connection failed"})
    }
}

}

export default redis;