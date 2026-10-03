import TaskModel from "../models/task.model.js";
import { createTask, getAllTask,getTaskById,updateTask,deleteTask } from "../services/task.services.js";

export const createTaskController = async(req,res)=>{
    try{
        const task = await createTask(req.body);
        res.status(201).json({
            success:true,
            data:task
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Error occured while creating Task"})
    }
}

export const GetAllTaskController = async(req,res)=>{
    try{
        const tasks = await getAllTask();
        if(!tasks){
            return res.status(404).json({message:"No tasks found"})
        }
        res.status(200).json({
            success:true,
            data:tasks
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Error occured while fetching all Task"})
    }
}


export const GetTaskById = async(req,res)=>{
    try{
        const id = req.params.id
        const task = await getTaskById(id)
        if(!task){
            return res.status(404).json({message:"No task found"})
        }
        res.status(200).json({
            success:true,
            data:task
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Error occured while fetching Task"})

    }
}

export const UpdateTaskController = async(req,res)=>{
    try{
        const task = await updateTask(req.params.id,req.body)
        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            data: task
        });

    }catch(error){
        console.log(error)
        return res.status(500).jsonn({message:"Error occured while updating Task"})
    }
}

export const DeleteTaskController = async (req, res) => {
    try {
        const task = await deleteTask(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occur while deleting"
        });
    }
};