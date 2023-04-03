// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { DeleteFileByIdUseCase } from "../../../../../application/usecases/files/DeleteFileById"

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
    const deleteFileByIdUseCase = new DeleteFileByIdUseCase(
      gcpFileCloudRepository,
      mySQLFileDBRepository
    )
    const deletedFIle = await deleteFileByIdUseCase.run(deleteFileByIdParams)
    res.status(200).json(deletedFIle)
  } catch (err) {
    return next(err)
  }
}
