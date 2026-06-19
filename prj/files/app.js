import express from "express";
import create from "./actions/create.js";
import fetch from "./actions/fetch.js";
const app=express();

app.use(express.json());

app.post("/create",create);
app.get("/fetch",fetch);

export default app;