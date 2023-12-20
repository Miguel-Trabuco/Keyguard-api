import express from "express";

import { createKeyController } from "../controllers/key/createKey.controller";
import { updateKeyController } from "../controllers/key/updateKey.controller";
import { getKeysController } from "../controllers/key/getKeys.controller";
import { deleteKeyController } from "../controllers/key/deleteKey.controller";
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
