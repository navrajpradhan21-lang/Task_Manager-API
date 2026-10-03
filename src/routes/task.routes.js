import express from "express";
import { createTaskController ,GetAllTaskController, GetTaskById, UpdateTaskController,DeleteTaskController } from '../controllers/task.controller.js'

const router = express.Router()


router.post("/",createTaskController)

router.get("/",GetAllTaskController)

router.get("/:id",GetTaskById)

router.patch('/:id',UpdateTaskController)

router.delete("/:id",DeleteTaskController)

export default router;
