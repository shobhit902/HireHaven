import express from "express";
import { createBid, createProject , getProjects, getBids, createInvite, acceptInvite} from "../controllers/projectandbid.controller.js";
const router = express.Router();

router.post("/create-Project", createProject);
router.get("/get-Projects", getProjects);

router.post("/create-Bid", createBid);
router.get("/get-Bids", getBids);

router.post("/create-Invite", createInvite);
router.post("/accept-Invite/:token", acceptInvite);

export default router;
