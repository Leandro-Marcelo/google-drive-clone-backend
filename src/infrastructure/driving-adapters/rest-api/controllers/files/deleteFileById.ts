// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { DeleteFileUseCase } from "../../../../../application/usecases/files/DeleteFile"

// * REPOSITORIES
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"

// * DTO
import { deleteFileByIdDto } from "../../dtos/files/deleteFileByIdDto"

export const deleteFileById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleteFileByIdParams = deleteFileByIdDto(req)
    const gcpFileCloudRepository = new GCPFileCloudRepository()
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const deleteFileUseCase = new DeleteFileUseCase(
      gcpFileCloudRepository,
      mySQLFileDBRepository
    )
    const deletedFIle = await deleteFileUseCase.run(deleteFileByIdParams)
    res.status(200).json(deletedFIle)
  } catch (err) {
    return next(err)
  }
}
