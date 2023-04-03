// * DEPENDENCIES
import express from "express"

// * CONTROLLERS
import { getAllUsers } from "../controllers/users/getAllUsers"
import { getUser } from "../controllers/users/getUser"
import { createUser } from "../controllers/users/createUser"
import { updateUserById } from "../controllers/users/updateUserById"
import { uploadManyFiles } from "../controllers/files/uploadManyFiles"
import { isAuth } from "../middlewares/isAuth"
import multerUpload from "../middlewares/multerUpload"
import { deleteFileById } from "../controllers/files/deleteFileById"
import { streamFileById } from "../controllers/files/streamFileById"

const router = express.Router()

// * ROUTES
router.get("/root", getAllUsers)

// router.get("/:fileName", getUser)
router.get("/:fileId", streamFileById)
router.delete("/:fileId", deleteFileById)

router.post(
  "/uploadMany/folder/:folderId",
  [isAuth, multerUpload.array("files")],
  uploadManyFiles
)

router.post("/", createUser)

router.put("/:fileId", updateUserById)

export default router
