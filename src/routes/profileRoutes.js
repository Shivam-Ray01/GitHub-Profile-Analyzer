import { Router } from 'express';
import {analyzeProfile,listProfiles, getProfile, removeProfile, compareProfiles} from '../controllers/profileController.js';
import {requestLimiter} from '../middleware/requestlimiter.js';

const router = Router();
router.use(requestLimiter);

router.post("/analyze/:username", analyzeProfile);
router.get("/", listProfiles);
router.get("/compare", compareProfiles);
router.get("/:username", getProfile);
router.delete("/:username", removeProfile);

export default router;
