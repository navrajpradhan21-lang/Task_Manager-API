import { body,param,validationResult } from "express-validator";

export const createTaskValidation = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({max:100})
    .withMessage("Title cannot exceed 100 characters"),

    body("description").optional().isString().withMessage('description must be a string'),

    body("status").optional().isIn(["pending","in-progress","completed"]).withMessage("Invalid status"),


    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }

];

export const validateTaskId = [
    param("id")
    .isMongoId()
    .withMessage('Invalid task ID'),

    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
             return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();

    }
];

