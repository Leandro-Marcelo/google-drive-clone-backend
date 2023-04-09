// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { UploadManyFilesUseCase } from "../../../../../application/usecases/files/UploadManyFiles"

// * REPOSITORIES
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"
import { UuidV4Generator } from "../../../../utils/uuidV4Generator"
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"
import { uploadManyFilesDto } from "../../dtos/files/uploadManyFilesDto"
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"

// * DTO

export const uploadManyFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const uploadManyFilesParams = uploadManyFilesDto(req)
    const gcpFileCloudRepository = new GCPFileCloudRepository()
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const uuidV4Generator = new UuidV4Generator()

    const uploadManyFilesUseCase = new UploadManyFilesUseCase(
      gcpFileCloudRepository,
      mySQLFolderDBRepository,
      mySQLFileDBRepository,
      uuidV4Generator
    )
    const uploadedFiles = await uploadManyFilesUseCase.run(
      uploadManyFilesParams
    )

    res.status(200).json(uploadedFiles)
    return
  } catch (err) {
    return next(err)
  }
}
