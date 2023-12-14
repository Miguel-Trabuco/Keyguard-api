import express from "express";
const userRouter = express.Router();

import { createUserController } from "../controllers/user/createUser.controller";
import { updateUserController } from "../controllers/user/updateUser.controller";
import { getUserController } from "../controllers/user/getUser.controller";
import { deleteUserController } from "../controllers/user/deleteUser.controller";

userRouter.post('/createUser', (req, res) => {
    return createUserController(req, res);
});

userRouter.put('/updateUser', (req, res) => {
    return updateUserController(req, res);
});

userRouter.get('/getUser', (req, res) => {
    return getUserController(req, res);
});

userRouter.delete('/deleteUser', (req, res) => {
    return deleteUserController(req, res);
});

export { userRouter };
