import { configDotenv } from "dotenv";

import { afterAll,afterEach,beforeAll,beforeEach,describe,it ,expect,vi } from "vitest";

import request from "supertest"
import mongoose from "mongoose";

import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import redis from "../src/config/redis.js";
import TaskModel from "../src/models/task.model.js";

beforeAll(async()=>{
    if(!process.env.MONGO_TEST_URI){
        throw new Error("MONGO_TEST_URI is not configured");
    }
    await connectDB(process.env.MONGO_TEST_URI);
});

beforeEach(async()=>{
    await TaskModel.deleteMany({});
    await redis.del("task:all");

});

afterEach(async()=>{
    vi.restoreAllMocks();
});

afterAll(async()=>{
    await TaskModel.deleteMany({});
    await redis.del("tasks:all");

    await mongoose.disconnect();
    await redis.quit();

});
describe("Task caching",()=>{
    it('should populate redis on cache miss',async()=>{
        await TaskModel.create({
            title:"Cache test task"
        });
        const response = await request(app).get("/api/tasks");
        expect(response.status).toBe(200);

        const cachedTasks = await redis.get("tasks:all");
        
        expect(cachedTasks).not.toBeNull();

        const parsedTasks = JSON.parse(cachedTasks);
        expect(parsedTasks).toHaveLength(1);
        expect(parsedTasks[0].title).toBe("Cache test task");
    });

    it("should server the second request from Redis",async()=>{
        await TaskModel.create({
            title:"Cached Task"
        });
        const findSpy = vi.spyOn(TaskModel,"find");
        const firstResponse = await request(app).get("/api/tasks");

        expect(firstResponse.status).toBe(200);
        expect(findSpy).toHaveBeenCalledTime(1);

        const secondResponse = await request(app)
            .get("/api/tasks");

        expect(secondResponse.status).toBe(200);
        expect(findSpy).toHaveBeenCalledTimes(1);

        expect(secondResponse.body.data[0].title)
            .toBe("Cached task");

    })
    
})