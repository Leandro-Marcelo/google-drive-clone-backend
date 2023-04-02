// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetUserByUniqueProperty } from "../../../../../application/usecases/user/getUserByUniqueProperty"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/MySQL/MySQLUserRepository"

// * DTO
import { getUserByUniquePropertyDto } from "../../dtos/user/getUserByUniquePropertyDto"

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getUserByUniquePropertyParams = getUserByUniquePropertyDto(req)
    const mySQLUserRepository = new MySQLUserRepository()
    const getUserUseCase = new GetUserByUniqueProperty(mySQLUserRepository)
    const users = await getUserUseCase.run(getUserByUniquePropertyParams)
    res.status(200).json(users)
    return
  } catch (err) {
    return next(err)
  }
}
