// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { SoftDeleteManyFoldersUseCase } from "../../../../../application/usecases/folders/SoftDeleteManyFolders"

// * REPOSITORIES
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"

// * DTO
import { softDeleteManyFilesDto } from "../../dtos/files/softDeleteManyFilesDto"

export const softDeleteManyFolders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filesIds = softDeleteManyFilesDto(req)
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const softDeleteManyFoldersUseCase = new SoftDeleteManyFoldersUseCase(
      mySQLFolderDBRepository
    )
    const updatedFilesDB = await softDeleteManyFoldersUseCase.run(filesIds)
    res.status(200).json(updatedFilesDB)
  } catch (err) {
    return next(err)
  }
}
