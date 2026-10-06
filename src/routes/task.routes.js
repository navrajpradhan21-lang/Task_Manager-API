import express from "express";
import { createTaskController ,GetAllTaskController, GetTaskById, UpdateTaskController,DeleteTaskController } from '../controllers/task.controller.js'

import { createTaskValidation,validateTaskId } from "../middleware/task.validator.js";
import asyncHandler from "../utils/asyncHandler.js";


const router = express.Router()


router.post("/",
    createTaskValidation,
    asyncHandler(createTaskController))

router.get("/",
    asyncHandler(GetAllTaskController)
)

router.get("/:id",
    validateTaskId,
    asyncHandler(GetTaskById)
)

router.patch('/:id',
    validateTaskId,
    asyncHandler(UpdateTaskController))

router.delete("/:id",
    validateTaskId,
    asyncHandler(DeleteTaskController))

export default router;
