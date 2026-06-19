import mongoose from "mongoose";
import dotenv from "dotenv";
async function connect(){

    try{
        dotenv.config();
        const pass=process.env.password;
        const enc=encodeURIComponent(pass);
        const path=`mongodb+srv://java_refresh:${enc}@cluster0.t0mdssq.mongodb.net/?appName=Cluster0`
        const conn=await mongoose.connect(path);
        if(conn){
            console.log("connected to database successfully")
        }
        else{
            console.log("could not connect to database");
        }
    }
    catch(error){
        console.log(error.message);
    }
}
export default connect;