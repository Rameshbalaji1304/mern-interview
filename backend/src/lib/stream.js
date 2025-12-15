import {StreamChat} from 'stream-chat'
import { ENV } from './env.js'


const apiKey=ENV.STREAM_API_KEY;
const apiSecret=ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Missing API KEY or API SERET KEY");
}
//chatclient is like a pass to message or video call
export const chatClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async(userData)=>{
    try {
        await chatClient.upsertUser(userData)
      console.log("Stream User upserted Success!",userData)
    } catch (error) {
        console.error("Error upserting Stream User:",error);
    }
}

export const deleteStreamUser=async(userId)=>{
    try {
        await chatClient.deleteUser([userId])
        console.log("Stream User deleted Success!",userId)
    } catch (error) {
        console.error("Error deleting Stream User:",error);
    }
}