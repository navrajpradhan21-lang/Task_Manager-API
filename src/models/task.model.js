import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["pending","in-progress","conmpleted"],
        default:"pending"
    }
},{timestamps:true})

const TaskModel = mongoose.model("Task",taskSchema);
export default TaskModel;
