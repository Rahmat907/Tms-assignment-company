import dotenv from "dotenv"
dotenv.config()
import app from "./app.js";


const Port:number = Number(process.env.PORT) || 7000; 
app.listen(Port,()=>{
    console.log(`server is connected bro ${Port}`)
})