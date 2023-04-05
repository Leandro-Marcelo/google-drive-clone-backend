// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetUserByUniqueProperty } from "../../../../../application/usecases/users/GetUserByUniqueProperty"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/mysql/MySQLUserRepository"

// * DTO
import { getUserByUniquePropertyDto } from "../../dtos/users/getUserByUniquePropertyDto"

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
