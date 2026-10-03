import TaskModel from "../models/task.model.js"

export const createTask = async(data)=>{
    return await TaskModel.create(data);
};


export const getAllTask = async()=>{
    return await TaskModel.find().sort({createdAt:-1});
};

export const getTaskById = async(id)=>{
    return await Task.findById(id);
}

export const updateTask = async(id,data)=>{

    return await TaskModel.findByIdAndUpdate(
        id,
        data,
        {
            new:true,
            runValidators:true
        }
    );

};

export const deleteTask = async(id)=>{
    return await TaskModel.findByIdAndDelete(id);
}