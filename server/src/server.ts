import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import router from "./routers/auth.route.js";

const app = express();
app.use(cors({
    origin : ["http://localhost:3000"],
}))

app.use(express.json())
app.use('/api',router)

const Port:number = Number(process.env.PORT) || 7000;
app.get('/',(req,res)=>{
    return res.send("Hello server")
})
app.listen(Port,()=>{
    console.log(`server is connected bro ${Port}`)

})