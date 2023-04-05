// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetRootFoldersUseCase } from "../../../../../application/usecases/folders/GetRootFolders"

// * REPOSITORIES
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"
import { CreateFolderUseCase } from "../../../../../application/usecases/folders/CreateFolder"
import { UuidV4Generator } from "../../../../utils/uuidV4Generator"
import { createFolderDto } from "../../dtos/folders/createFolderDto"

export const createFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const createFolderParams = createFolderDto(req)
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const uuidV4Generator = new UuidV4Generator()
    const createFolderUseCase = new CreateFolderUseCase(
      mySQLFolderDBRepository,
      uuidV4Generator
    )
    const createdFolder = await createFolderUseCase.run(createFolderParams)
    res.status(201).json(createdFolder)
  } catch (err) {
    return next(err)
  }
}
