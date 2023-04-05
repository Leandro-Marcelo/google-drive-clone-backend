// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { UpdateFolderByIdUseCase } from "../../../../../application/usecases/folders/UpdateFolderById"

// * REPOSITORIES
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"

// * DTO
import { updateFolderByIdDto } from "../../dtos/folders/updateFolderByIdDto"

export const updateFolderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updateFolderByIdParams = updateFolderByIdDto(req)
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const updateFolderByIdUseCase = new UpdateFolderByIdUseCase(
      mySQLFolderDBRepository
    )
    const updatedFolder = await updateFolderByIdUseCase.run(
      updateFolderByIdParams
    )
    res.status(200).json(updatedFolder)
    return
  } catch (err) {
    return next(err)
  }
}
