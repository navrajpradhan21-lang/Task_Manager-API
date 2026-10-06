import redis from "../config/redis.js";

// Not this has a fixed window 
const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 5;

const rateLimiter = async(req,res)=>{
    const ip = req.ip;
    const key = `rate-limit:${ip}`;

    const requests = await redis.incr(key);

    if(requests===1){
        await redis.expire(key,WINDOW_SECONDS)
    }

    if(requests>MAX_REQUESTS){
        return res.status(429).json({
            success:false,
            message:"Too many requests.Please try again later."
        });

    }
    res.setHeader(
        "X-RateLimiter-Limit",
        MAX_REQUESTS
    );
    res.setHeader(
        "X-RateLimit-Remaining",
        Math.max(MAX_REQUESTS - requests, 0)
    );
    next();

};

export default rateLimiter;
