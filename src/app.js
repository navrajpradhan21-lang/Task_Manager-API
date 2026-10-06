import express from "express";
import router from "./routes/task.routes.js";
import rateLimiter from "./middleware/rateLimiter.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import requestLogger from "./middleware/requestLogger.middleware.js";

const app = express();


// Middleware

app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

// Test route
app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"Production Task API is running"
    });

});


app.use('/api/tasks',router)

// Must be after Routes
app.use(errorMiddleware);

export default app;
