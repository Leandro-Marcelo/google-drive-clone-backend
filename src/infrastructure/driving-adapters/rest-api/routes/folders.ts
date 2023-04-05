// * DEPENDENCIES
import express, { Request, Response } from "express"

// * CONTROLLERS
import { isAuth } from "../middlewares/isAuth"
import { getRootFolders } from "../controllers/folders/getRootFolders"
import { createFolder } from "../controllers/folders/createFolder"
import { deleteFolderById } from "../controllers/folders/deleteFolderById"
import { updateFolderById } from "../controllers/folders/updateFolderById"

const router = express.Router()

// * ROUTES
router.get("/root", [isAuth], getRootFolders)

router.post("/create", [isAuth], createFolder)
router.put("/:folderId", [isAuth], updateFolderById)
router.delete("/:folderId", [isAuth], deleteFolderById)

export default router
