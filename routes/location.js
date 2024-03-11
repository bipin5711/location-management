import { Router } from "express";
import {
  deleteLocation,
  getAllLocations,
  getLocation,
  postLocation,
  updateLocation,
} from "../controllers/location.js";

const router = Router();

router.get("/", getAllLocations);

router.post("/", postLocation);

router.get("/:id", getLocation);

router.put("/:id", updateLocation);

router.delete("/:id", deleteLocation);

export default router;
