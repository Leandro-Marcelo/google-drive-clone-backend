// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetRootFilesUseCase } from "../../../../../application/usecases/files/GetRootFiles"

// * REPOSITORIES
import { MySQLFileDBRepository } from "../../../../implementations/mysql/MySQLFileDBRepository"
import { CurrentUser } from "../../../../../domain/utils/interfaces"

export const getRootFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentUser: CurrentUser = req.currentUser
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const getRootFilesUseCase = new GetRootFilesUseCase(mySQLFileDBRepository)
    const rootFiles = await getRootFilesUseCase.run(currentUser.id)
    res.status(200).json(rootFiles)
  } catch (err) {
    return next(err)
  }
}
