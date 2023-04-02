// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetUser } from "../../../../../application/usecases/user/getUser"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/MySQL/MySQLUserRepository"

// * DTO
import { getUserDto } from "../../dtos/user/getUserDto"

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getUserParams = getUserDto(req)
    const mySQLUserRepository = new MySQLUserRepository()
    const getUserUseCase = new GetUser(mySQLUserRepository)
    const users = await getUserUseCase.run(getUserParams)
    res.status(200).json(users)
    return
  } catch (err) {
    return next(err)
  }
}
