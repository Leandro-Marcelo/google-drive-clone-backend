import { z } from "zod"

// * TYPES AND INTERFACES
import { Request } from "express"

export const deleteManyFilesDto = (req: Request): string[] => {
  const fileIdsSchema = z.array(z.string().uuid())
  const isValidFileIdsSchema = fileIdsSchema.safeParse(req.params)
  if (!isValidFileIdsSchema.success) {
    throw isValidFileIdsSchema.error
  }

  return isValidFileIdsSchema.data
}
