// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { UpdateUserByIdUseCase } from "../../../../../application/usecases/users/UpdateUserById"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/mysql/MySQLUserRepository"

// * DTO
import { updateUserByIdDto } from "../../dtos/users/updateUserByIdDto"

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updateUserByIdParams = updateUserByIdDto(req)
    const mySQLUserRepo = new MySQLUserRepository()
    const updateUserByIdUseCase = new UpdateUserByIdUseCase(mySQLUserRepo)
    const updatedUser = await updateUserByIdUseCase.run(updateUserByIdParams)
    res.status(200).json(updatedUser)
    return
  } catch (err) {
    return next(err)
  }
}
