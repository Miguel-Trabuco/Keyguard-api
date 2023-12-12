import express from "express";
const userRouter = express.Router();

import { createUserController } from "../controllers/createUser.controller";
import { updateUserController } from "../controllers/updateUser.controller";

userRouter.post('/createUser', (req, res) => {
    return createUserController(req, res);
});

userRouter.put('/updateUser', (req, res) => {
    return updateUserController(req, res);
});

export { userRouter };
