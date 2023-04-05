// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { DeleteUserByIdUseCase } from "../../../../../application/usecases/users/DeleteUserById"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/mysql/MySQLUserRepository"

import { deleteUserByIdDto } from "../../dtos/users/deleteUserByIdDto"

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleteUserIdParams = deleteUserByIdDto(req)
    const mySQLUserRepo = new MySQLUserRepository()
    const deleteUserByIdUseCase = new DeleteUserByIdUseCase(mySQLUserRepo)
    const deletedUser = await deleteUserByIdUseCase.run(deleteUserIdParams)
    res.status(200).json(deletedUser)
    return
  } catch (err) {
    return next(err)
  }
}
