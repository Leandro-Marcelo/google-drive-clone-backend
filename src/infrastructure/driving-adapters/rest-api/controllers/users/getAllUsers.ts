// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetAllUsersUseCase } from "../../../../../application/usecases/users/GetAllUsers"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/mysql/MySQLUserRepository"

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mySQLUserRepository = new MySQLUserRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(mySQLUserRepository)
    const users = await getAllUsersUseCase.run()
    res.status(200).json(users)
    return
  } catch (err) {
    return next(err)
  }
}
