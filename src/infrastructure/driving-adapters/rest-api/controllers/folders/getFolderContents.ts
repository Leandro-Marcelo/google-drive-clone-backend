// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { GetFolderContentsUseCase } from "../../../../../application/usecases/folders/GetFolderContents"

// * REPOSITORIES
import { MySQLFolderDBRepository } from "../../../../implementations/mysql/MySQLFolderDBRepository"

// * DTO
import { getFolderContentsDto } from "../../dtos/folders/getFolderContentsDto"

export const getFolderContents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getFolderContentsParams = getFolderContentsDto(req)
    const mySQLFolderDBRepository = new MySQLFolderDBRepository()
    const getFolderContentsUseCase = new GetFolderContentsUseCase(
      mySQLFolderDBRepository
    )
    const folderContents = await getFolderContentsUseCase.run(
      getFolderContentsParams
    )
    res.status(200).json(folderContents)
    return
  } catch (err) {
    return next(err)
  }
}
