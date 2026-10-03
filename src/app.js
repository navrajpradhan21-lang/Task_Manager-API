import express from "express";
import router from "./routes/task.routes.js";
const app = express();


// Middleware
app.use(express.json())

// Test route
app.get("/",(req,res)=>{
    res.json({
        sucess:true,
        message:"Production Task API is running"
    });

})

app.use('/api/tasks',router)

export default app;
