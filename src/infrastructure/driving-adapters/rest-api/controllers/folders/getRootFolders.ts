// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetRootFoldersUseCase } from "../../../../../application/usecases/folders/GetRootFolders"

// * REPOSITORIES
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"
import { CurrentUser } from "../../../../../domain/utils/interfaces"

export const getRootFolders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentUser: CurrentUser = req.currentUser
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const getRootFoldersUseCase = new GetRootFoldersUseCase(
      mySQLFolderDBRepository
    )
    const rootFolders = await getRootFoldersUseCase.run(currentUser.id)
    res.status(200).json(rootFolders)
  } catch (err) {
    return next(err)
  }
}
