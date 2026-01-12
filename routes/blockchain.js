import express from "express";
import BlockchainController from "../controller/blockchainController.js";

const router = express.Router();

router.get("/blockchain/list", BlockchainController.getAll);

router.post("/blockchain", BlockchainController.create);

router.delete("/blockchain/remove", BlockchainController.delete);

export default router;
