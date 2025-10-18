
import express  from "express";
import {client} from "@repo/db/client"

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello from backend!");
})

app.post("/user",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
    }

    try{
    await client.user.create({
        data:{
            username:username,
            password:password
        }
    })

    res.json({
        "message":"User Created successfully"
    })
    }catch(e){
        res.status(500).json({ error: e });
    }
})

app.post("/todo",async (req,res)=>{
    const task = req.body.task;
    const done = req.body.done;
    try{
    await client.todo.create({
        data:{
            task:task,
            done:done,
            userId:"1"
        }
    })
    }catch(e){
        res.status(500).json({ error: e });
    }
})

app.listen(8080);