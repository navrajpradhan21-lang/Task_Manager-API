import TaskModel from "../models/task.model.js";
import { createTask, getAllTask,getTaskById,updateTask,deleteTask } from "../services/task.services.js";

export const createTaskController = async(req,res)=>{
    
        const task = await createTask(req.body);
        res.status(201).json({
            success:true,
            data:task
        });

    
}

export const GetAllTaskController = async(req,res)=>{
    
        const tasks = await getAllTask();
        if(!tasks){
            return res.status(404).json({message:"No tasks found"})
        }
        res.status(200).json({
            success:true,
            data:tasks
        })
}


export const GetTaskById = async(req,res)=>{
    
        const id = req.params.id
        const task = await getTaskById(id)
        if(!task){
            return res.status(404).json({message:"No task found"})
        }
        res.status(200).json({
            success:true,
            data:task
        })

    
}

export const UpdateTaskController = async(req,res)=>{

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

}

export const DeleteTaskController = async (req, res) => {
    
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

};