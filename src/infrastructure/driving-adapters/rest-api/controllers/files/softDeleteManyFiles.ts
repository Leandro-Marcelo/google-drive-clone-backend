// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { SoftDeleteManyFilesUseCase } from "../../../../../application/usecases/files/SoftDeleteManyFiles"

// * REPOSITORIES
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"

// * DTO
import { softDeleteManyFilesDto } from "../../dtos/files/softDeleteManyFilesDto"

export const softDeleteManyFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filesIds = softDeleteManyFilesDto(req)
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const softDeleteManyFilesUseCase = new SoftDeleteManyFilesUseCase(
      mySQLFileDBRepository
    )
    const updatedFilesDB = await softDeleteManyFilesUseCase.run(filesIds)
    res.status(200).json(updatedFilesDB)
  } catch (err) {
    return next(err)
  }
}
