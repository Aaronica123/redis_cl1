import express from "express";
import create from "./actions/create.js";
import fetch from "./actions/fetch.js";
import fetch_red from "./actions/fetch_redis.js";
import create_item from "./actions/inv_create.js";
import update from "./actions/inv_search.js";
const app=express();

app.use(express.json());

app.post("/create",create);
app.post("/create_item",create_item);
app.post("/update",update);
app.get("/fetch",fetch);
app.get("/fetch_redis",fetch_red);
export default app;