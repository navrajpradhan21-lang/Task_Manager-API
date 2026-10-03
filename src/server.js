import connectDB from "./config/db.js";
import app from "./app.js";
import redis from "./config/redis.js";

import { configDotenv } from "dotenv";

configDotenv()

const PORT = process.env.PORT || 5000;


const startServer = async()=>{
    await connectDB();
    await redis.set("test","Redis is working");
    const value = await redis.get("test");
    console.log("Redis value :",value);

    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });

}

startServer();
