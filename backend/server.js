import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path : "./.env"
})

connectDB()
    .then(()=>{
        const port=process.env.PORT || 8000;
        app.listen(port, ()=>{
            console.log(`SERVER is running on : ${port}`)
        })
    })
    .catch((error)=>{
        console.log("MONGO DB Connection failed !!!", error);
    })
