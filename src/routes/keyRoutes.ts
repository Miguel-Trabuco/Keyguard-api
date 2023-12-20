import express from "express";

import { createKeyController } from "../controllers/key/createKeyController";
import { updateKeyController } from "../controllers/key/updateKeyController";
import { getKeysController } from "../controllers/key/getKeysController";
import { deleteKeyController } from "../controllers/key/deleteKeyController";
const keyRouter = express.Router();

keyRouter.post('/createKey', (req, res) => {
    return createKeyController(req, res);
});

keyRouter.put('/updateKey', (req, res) => {
    return updateKeyController(req, res);
});

keyRouter.get('/getKey', (req, res) => {
    return getKeysController(req, res);
});

keyRouter.delete('/deleteKey', (req, res) => {
    return deleteKeyController(req, res);
});

export { keyRouter };
