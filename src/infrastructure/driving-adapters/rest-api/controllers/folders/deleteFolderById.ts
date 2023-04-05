// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { DeleteFolderByIdUseCase } from "../../../../../application/usecases/folders/DeleteFolderById"

// * REPOSITORIES
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"

// * DTO
import { deleteFolderByIdDto } from "../../dtos/folders/deleteFolderByIdDto"

export const deleteFolderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleteFolderByIdParams = deleteFolderByIdDto(req)
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const deleteFolderByIdUseCase = new DeleteFolderByIdUseCase(
      mySQLFolderDBRepository
    )
    const deletedFolder = await deleteFolderByIdUseCase.run(
      deleteFolderByIdParams
    )
    res.status(200).json(deletedFolder)
    return
  } catch (err) {
    return next(err)
  }
}
