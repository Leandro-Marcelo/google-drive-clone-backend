// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { UpdateFileByIdUseCase } from "../../../../../application/usecases/files/UpdateFileById"

// * REPOSITORIES

// * DTO
import { updateFileByIdDto } from "../../dtos/files/updateFileByIdDto"
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"

export const updateFileById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updateFileByIdParams = updateFileByIdDto(req)
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const updateFileByIdUseCase = new UpdateFileByIdUseCase(
      mySQLFileDBRepository
    )
    const updatedFile = await updateFileByIdUseCase.run(updateFileByIdParams)
    res.status(200).json(updatedFile)
    return
  } catch (err) {
    return next(err)
  }
}
