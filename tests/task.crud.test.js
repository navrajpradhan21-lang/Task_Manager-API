import { beforeAll,afterAll, beforeEach,describe,it,expect } from "vitest";
import request from "supertest";

import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import redis from "../src/config/redis.js";
import TaskModel from "../src/models/task.model.js";

dotenv.config();

beforeAll(async()=>{
    if(!process.env.MONGO_TEST_URI){
        throw new Error("MONGO_TEST_URI is not configured");
    }
    await connectDB(process.env.MONGO_TEST_URI);
});

beforeEach(async()=>{
    await TaskModel.deleteMany({});
    await redis.del("tasks:all");
});

afterAll(async()=>{
    await TaskModel.deleteMany({});
    await redis.del('tasks:all');

    await mongoose.disconnect();
    await redis.quit();
})

describe("Task CRUD integration tests",()=>{
    let taskID;
    it("should create a task",async()=>{
        const response = await request(app)
        .post("/api/tasks")
        .send({
            title:"Test backend API",
            description:"CRUD integration test",
            status: "pending"
        });
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe("Test backend API");

        taskID = response.body.data._id;
        expect(taskID).toBeDefined();
    });

    it("should retrieve all tasks",async()=>{
        await TaskModel.create({
            title: "Retrive test task"
        });
        const response = await request(app).get("/api/tasks");
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0].title).toBe("Retrive test task");
    
    });

    it("should retrieve a task by ID",async()=>{
        const task = await TaskModel.create({
            title: "Find test task"
        });

        const response = await request(app).get(`/api/tasks/${task._id}`);

        expect(response.status).toBe(200);
        expect(response.body.data._id).toBe(task._id.toString());

    });

    it("should update a task",async()=>{
        const task = await TaskModel.create({
            title:"old title"
        });

        const response = await request(app)
        .patch(`/api/tasks/${task._id}`)
        .send({
            title:"Updated Title",
            status: "completed"
        });

        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe("Updated Title");
        expect(response.body.data.status).toBe("completed");

    });

    it("should delete a task",async()=>{
        const task = await TaskModel.create({
            title:"Delete test task"
        });

        const response = await request(app).delete(`/api/tasks/${task._id}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        const deleteTask = await TaskModel.findById(task._id);
        expect(deleteTask).toBeNull();

        
        
    })





    
})