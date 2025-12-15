import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute=[
    requireAuth({signInUrl:"/signin"}),//or you can leave it empty ...itll take you to home page
    async(req,res,next)=>{
        try {
            const clerkId=req.auth().userId;

            if(!clerkId) return res.status(401).json({msg:"unAuthorized - invalid Token"});
            //find user in db by clerkID
            const user=await User.findOne(clerkId);
            //attach user to request
            req.user=user;

            next();

            if(!user) return  res.status(404).json({msg:"User not found"});
        } catch (error) {
            console.error("Error in protectRoute Middleware", error);
            res.status(500).json({msg:"Internal server Error"});
        }
    }
]