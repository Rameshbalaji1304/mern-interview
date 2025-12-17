import express from 'express'
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import path from 'path'
import cors from 'cors'
import {serve} from 'inngest/express'
import { functions,inngest } from './lib/inngest.js';
import {clerkMiddleware} from '@clerk/express'
import { protectRoute } from './middleware/protectRoute.js';
import chatRoutes from './routes/chatRoute.js'
import sessionRoutes from './routes/sessionRoute.js'



const app=express();
const __dirname=path.resolve();
app.use(express.json())

//credentials=> server allows a browser to include cookies in req
if(ENV.NODE_ENV !== "production"){
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
}
app.use(clerkMiddleware())

app.use("/api/inngest",serve({client:inngest,functions}))

app.use("/api/chat",chatRoutes)
app.use("/api/session",sessionRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({message:'successfor   api'})
})
app.get('/video-call',protectRoute,(req,res)=>{
    res.status(200).json({message:'video call    api'})
})


if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

const startServer=async()=>{
    try {
        await connectDB();
        app.listen(ENV.PORT,()=>{
    console.log('server is running on port',ENV.PORT);  
})
    } catch (error) {
        console.log("error connecting to database");
        
    }
}

startServer();