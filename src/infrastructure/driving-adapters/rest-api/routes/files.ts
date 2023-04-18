// * DEPENDENCIES
import express, { Request, Response } from "express"

// * CONTROLLERS
import { uploadManyFiles } from "../controllers/files/uploadManyFiles"
import { isAuth } from "../middlewares/isAuth"
import multerUpload from "../middlewares/multerUpload"
import { deleteFileById } from "../controllers/files/deleteFileById"
import { streamFileById } from "../controllers/files/streamFileById"
import { getRootFiles } from "../controllers/files/getRootFiles"
import { updateFileById } from "../controllers/files/updateFileById"
import { softDeleteManyFiles } from "../controllers/files/softDeleteManyFiles"
import { uploadFiles } from "../controllers/files/uploadFiles"

const router = express.Router()

// * ROUTES

// TODO: delete many files, update file like rename, move, copy, etc

router.get("/root", [isAuth], getRootFiles)

router.get("/:fileName", streamFileById)

router.post("/upload/:folderId", [isAuth], uploadFiles)

router.post(
  "/uploadMany",
  [isAuth, multerUpload.array("files")],
  uploadManyFiles
)

router.put("/softDeleteMany", softDeleteManyFiles)

router.post("/deleteMany", (req: Request, res: Response) => {
  res.send("delete many files")
})

router.put("/:fileId", updateFileById)

router.delete("/:fileId", deleteFileById)

export default router
