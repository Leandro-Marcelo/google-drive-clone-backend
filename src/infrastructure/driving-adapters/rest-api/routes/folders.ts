// * DEPENDENCIES
import express, { Request, Response } from "express"

// * CONTROLLERS
import { isAuth } from "../middlewares/isAuth"
import { getRootFolders } from "../controllers/folders/getRootFolders"
import { createFolder } from "../controllers/folders/createFolder"
import { deleteFolderById } from "../controllers/folders/deleteFolderById"
import { updateFolderById } from "../controllers/folders/updateFolderById"
import { getFolderContents } from "../controllers/folders/getFolderContents"
import { softDeleteManyFolders } from "../controllers/folders/softDeleteManyFolders"

const router = express.Router()

// * ROUTES
router.get("/root", [isAuth], getRootFolders)
router.get("/:folderId", [isAuth], getFolderContents)
router.post("/create", [isAuth], createFolder)
router.put("/softDeleteMany", softDeleteManyFolders)
router.put("/:folderId", [isAuth], updateFolderById)
router.delete("/:folderId", [isAuth], deleteFolderById)

export default router
