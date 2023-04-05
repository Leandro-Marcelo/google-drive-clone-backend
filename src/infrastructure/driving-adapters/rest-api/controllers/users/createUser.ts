// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { CreateUserUseCase } from "../../../../../application/usecases/users/CreateUser"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/mysql/MySQLUserRepository"
import { createUserDto } from "../../dtos/users/createUserDto"
import { UuidV4Generator } from "../../../../utils/uuidV4Generator"

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const createUserParams = createUserDto(req)
    const mySQLUserRepo = new MySQLUserRepository()
    const uuidV4Generator = new UuidV4Generator()
    const createUserUseCase = new CreateUserUseCase(
      mySQLUserRepo,
      uuidV4Generator
    )
    const createdUser = await createUserUseCase.run(createUserParams)
    res.status(201).json(createdUser)
    return
  } catch (err) {
    return next(err)
  }
}
