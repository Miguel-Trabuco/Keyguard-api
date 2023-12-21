import express from "express";
const userRouter = express.Router();

import { createUserController } from "../controllers/user/createUserController";
import { updateUserController } from "../controllers/user/updateUserController";
import { getUserController } from "../controllers/user/getUserController";
import { deleteUserController } from "../controllers/user/deleteUserController";
import { loginController } from "../controllers/user/login.controller";
import { logoutController } from "../controllers/user/logoutController";
import { verifyEmailController } from "../controllers/user/verifyEmailController";
import { resendCodeController } from "../controllers/user/resendCodeController";

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

userRouter.post('/login', (req, res) => {
    return loginController(req, res);
});

userRouter.get('/logout', (req, res) => {
    return logoutController(req, res);
});

userRouter.post('/verifyEmail', (req, res) => {
    return verifyEmailController(req, res);
});

userRouter.post('/resendCode', (req, res) => {
    return resendCodeController(req, res);
})

export { userRouter };
