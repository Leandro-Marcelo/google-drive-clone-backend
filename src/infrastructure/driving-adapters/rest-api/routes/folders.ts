// * DEPENDENCIES
import express, { Request, Response } from "express"

// * CONTROLLERS
import { isAuth } from "../middlewares/isAuth"
import { getRootFolders } from "../controllers/folders/getRootFolders"

const router = express.Router()

// * ROUTES
router.get("/root", [isAuth], getRootFolders)

export default router
