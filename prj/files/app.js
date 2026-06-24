import express from "express";
import create from "./actions/create.js";
import fetch from "./actions/fetch.js";
import fetch_red from "./actions/fetch_redis.js";
import create_item from "./actions/inv_create.js";
import update from "./actions/inv_search.js";
import create_inv from "./inventory/inv_create.js";
import read_inv from "./inventory/inv_read.js";
const app=express();

app.use(express.json());

app.post("/create",create);
app.post("/create_item",create_item);
app.post("/update",update);
app.post("/create_inv",create_inv);
app.get("/read_inv",read_inv);
app.get("/fetch",fetch);
app.get("/fetch_redis",fetch_red);
export default app;