// * DEPENDENCIES
import express, { Request, Response } from "express"

// * CONTROLLERS
import { isAuth } from "../middlewares/isAuth"
import { getRootFolders } from "../controllers/folders/getRootFolders"
import { createFolder } from "../controllers/folders/createFolder"

const router = express.Router()

// * ROUTES
router.get("/root", [isAuth], getRootFolders)

router.post("/create", [isAuth], createFolder)
router.put("/:folderId", [isAuth], getRootFolders)
router.delete("/:folderId", [isAuth], getRootFolders)

export default router
