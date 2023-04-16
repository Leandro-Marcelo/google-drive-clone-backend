import { z } from "zod"

// * TYPES AND INTERFACES
import { Request } from "express"

export const softDeleteManyFilesDto = (req: Request): string[] => {
  const fileIdsSchema = z.array(z.string().uuid())
  const isValidFileIdsSchema = fileIdsSchema.safeParse(req.body)
  if (!isValidFileIdsSchema.success) {
    throw isValidFileIdsSchema.error
  }

  return isValidFileIdsSchema.data
}
