import { describe , it , expect} from "vitest";
import  request  from "supertest";

import app from "../src/app.js"

describe("Health Check",()=>{
    it("should return API status",async()=>{
        const response = await request(app).get("/");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.message).toBe('Production Task API is running');
    });
});

describe("Task validation",()=>{
    it("should reject an empty task title",async()=>{
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title:""
            });

        expect(response.status).toBe(400);

        expect(response.body.success).toBe(false);    
    });
});

describe("Task ID validation",()=>{
    it("should reject an invalid task ID",async()=>{
        const response = await request(app)
                .get("/api/tasks/hello");

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});
