// * DEPENDENCIES
import express, { Request, Response } from "express"

// * CONTROLLERS
import { createUser } from "../controllers/users/createUser"
import { updateUserById } from "../controllers/users/updateUserById"
import { uploadManyFiles } from "../controllers/files/uploadManyFiles"
import { isAuth } from "../middlewares/isAuth"
import multerUpload from "../middlewares/multerUpload"
import { deleteFileById } from "../controllers/files/deleteFileById"
import { streamFileById } from "../controllers/files/streamFileById"
import { getRootFiles } from "../controllers/files/getRootFiles"

const router = express.Router()

// * ROUTES

// TODO: delete many files, update file like rename, move, copy, etc

router.get("/root", [isAuth], getRootFiles)

router.post(
  "/uploadMany",
  [isAuth, multerUpload.array("files")],
  uploadManyFiles
)

router.post("/", createUser)
router.get("/:fileName", streamFileById)
router.delete("/:fileId", deleteFileById)

router.put("/:fileId", updateUserById)

export default router
