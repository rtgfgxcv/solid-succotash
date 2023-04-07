const { spawn, exec } = require('child_process');
const express = require("express");
let proc;
const app = express();
const fs = require("fs")
app.use(express.json());
app.get("/",function(req,res){
  res.send("x")
})
app.post("/thingy", (req, res) => {
    try {
  console.log(req.body.x)
    try {
        proc.kill()
    } catch(error){}

    proc = spawn('./test.js', [req.body.x])
    
    res.send("ok")
    }catch(err){res.send("error happened")}
})
app.post("/kill", (req, res) => {
    try{
  try {
    proc.kill()
  } catch(error){}
  exec("pkill test.js")
  res.send("ok")
  }catch(err){res.send("error happened")}
})
app.listen("8080")
