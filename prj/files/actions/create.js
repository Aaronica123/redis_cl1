import user_obj from "../models/user_model.js";

async function create(req,res){
    try{
    const f=await user_obj.countDocuments();
    if(f){
        return res.status(200).json({"message":"Users are already created"})
    }
    else{
    var x=100;
    while(x<150 ){
        await user_obj.create({
            user_id:x,
            user_name:`user ${x}`
        })
        x++;
    }
    return res.status(201).json({"message":"Users created "})
}
}
catch(error){
    console.log(error.message);
}
}

export default create;