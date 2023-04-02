// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetAllUserUseCase } from "../../../../../application/usecases/user/getAllUser"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/MySQL/MySQLUserRepository"

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mySQLUserRepository = new MySQLUserRepository()
    const getAllUserUseCase = new GetAllUserUseCase(mySQLUserRepository)
    const users = await getAllUserUseCase.run()
    res.status(200).json(users)
    return
  } catch (err) {
    return next(err)
  }
}
