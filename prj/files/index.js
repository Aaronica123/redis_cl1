import redis_1 from "./connect/redis.js";
import app from "./app.js";
import connect from "./connect/connect.js";
import call from "./redis_files/redis_pool.js";
import call_red from "./redis_files/red.js";
function start(){
    connect();
    // redis_1();
    // call();
    // call_red();
    app.listen(3001);
    console.log("listening");
}
start();