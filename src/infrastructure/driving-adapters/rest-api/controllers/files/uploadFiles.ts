// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { UploadFilesUseCase } from "../../../../../application/usecases/files/UploadFiles"

// * REPOSITORIES
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"
import { LocalFileCloudRepository } from "../../../../implementations/local/LocalFileCloudRepository"
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"
import { UuidV4Generator } from "../../../../../infrastructure/utils/uuidV4Generator"
import { uploadFilesDto } from "../../dtos/files/uploadFilesDto"
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"

export const uploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const folderId = uploadFilesDto(req)
    const uuidV4Generator = new UuidV4Generator()
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    //const localFileCloudRepository = new LocalFileCloudRepository()
    const gcpFileCloudRepository = new GCPFileCloudRepository()
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const uploadFilesUseCase = new UploadFilesUseCase(
      gcpFileCloudRepository,
      mySQLFileDBRepository,
      mySQLFolderDBRepository,
      uuidV4Generator
    )
    await uploadFilesUseCase.run({
      currentUser: req.currentUser,
      folderId: folderId,
      req,
      res,
    })
  } catch (err) {
    return next(err)
  }
}
