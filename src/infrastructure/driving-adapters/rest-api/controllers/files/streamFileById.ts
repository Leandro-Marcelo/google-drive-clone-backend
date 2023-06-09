import { MySQLFileDBRepository } from "./../../../../implementations/mysql/MySQLFileDBRepository"
// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { StreamFileByIdUseCase } from "../../../../../application/usecases/files/StreamFileByIdUseCase"

// * REPOSITORIES
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"

// * DTO
import { streamFileByFileNameDto } from "../../dtos/files/streamFileByFileNameDto"

export const streamFileById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const streamFileByFileNameParams = streamFileByFileNameDto(req, res)
    const gcpFileCloudRepository = new GCPFileCloudRepository()
    const mySQLFileDBRepository = new MySQLFileDBRepository()
    const streamFileByIdUseCase = new StreamFileByIdUseCase(
      gcpFileCloudRepository,
      mySQLFileDBRepository
    )
    await streamFileByIdUseCase.run(streamFileByFileNameParams)
    return
  } catch (err) {
    return next(err)
  }
}
