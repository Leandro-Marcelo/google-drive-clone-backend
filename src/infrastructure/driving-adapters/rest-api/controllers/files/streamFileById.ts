// * TYPES AND INTERFACES
import { StreamFileByIdParams } from "../../../../../domain/utils/interfaces"
import { NextFunction, Request, Response } from "express"

// * USE CASES
import { StreamFileByIdUseCase } from "../../../../../application/usecases/files/StreamFileById"

// * REPOSITORIES
import { GCPFileCloudRepository } from "../../../../implementations/gcp/cloudStorage/GCPFileCloudRepository"

// * DTO
import { streamFileByIdDto } from "../../dtos/files/streamFileByIdDto"

export const streamFileById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const streamFileByIdParams = streamFileByIdDto(req, res)
    const gcpFileCloudRepository = new GCPFileCloudRepository()
    const streamFileByIdUseCase = new StreamFileByIdUseCase(
      gcpFileCloudRepository
    )
    await streamFileByIdUseCase.run(streamFileByIdParams)
    return
  } catch (err) {
    return next(err)
  }
}
