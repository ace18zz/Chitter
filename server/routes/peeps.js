import express from "express";
import { getFeedPeeps, getUserPeeps, likePeep } from "../controllers/peeps.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPeeps);
router.get("/:userId/Peeps", verifyToken, getUserPeeps);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePeep);

export default router;