import redis from "../config/redis.js";
import TaskModel from "../models/task.model.js"

export const createTask = async(data)=>{

    const task = await TaskModel.create(data);
    await redis.del("tasks:all");
    return task
};


export const getAllTask = async()=>{

    const cachedTasks = await redis.get("tasks:all")

    if(cachedTasks){
        console.log("Cache HIT")
        return JSON.parse(cachedTasks);
    }

    const tasks = await TaskModel.find().sort({createdAt:-1});
    await redis.set(
        "tasks:all",
        JSON.stringify(tasks),
        "EX",
        60
    )
    return tasks
};

export const getTaskById = async(id)=>{
    return await Task.findById(id);
}

export const updateTask = async(id,data)=>{

    const task =  await TaskModel.findByIdAndUpdate(
        id,
        data,
        {
            new:true,
            runValidators:true
        }
    );
    if(task){
        await redis.del("tasks:all");
    }
    return task

};

export const deleteTask = async(id)=>{
    
      const task = await TaskModel.findByIdAndDelete(id);

    if (task) {
        await redis.del("tasks:all");
    }

    return task;
}