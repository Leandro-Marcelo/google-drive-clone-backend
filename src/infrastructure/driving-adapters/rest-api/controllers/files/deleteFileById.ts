// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { DeleteManyFilesUseCase } from "../../../../../application/usecases/files/DeleteManyFiles"

// * REPOSITORIES
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"

// * DTO
import { deleteManyFilesDto } from "../../dtos/files/deleteManyFilesDto"

export const deleteFileById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filesIdsToDelete = deleteManyFilesDto(req)
    const gcpFileCloudRepository = new GCPFileCloudRepository()
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const deleteManyFilesUseCase = new DeleteManyFilesUseCase(
      gcpFileCloudRepository,
      mySQLFileDBRepository
    )
    const deletedFIle = await deleteManyFilesUseCase.run(filesIdsToDelete)
    res.status(200).json(deletedFIle)
  } catch (err) {
    return next(err)
  }
}
