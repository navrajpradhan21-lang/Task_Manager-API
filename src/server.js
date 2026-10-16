import connectDB from "./config/db.js";
import app from "./app.js";
import redis from "./config/redis.js";

import { configDotenv } from "dotenv";

configDotenv()

const PORT = process.env.PORT || 5000;


const startServer = async()=>{
    try{
        await connectDB();

        const value = await redis.ping();
        console.log("Redis ping:",value)
        
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });

    }catch(error){
        console.log("Server startup failed:",error.message);
        process.exit(1);

    }
};

startServer();
