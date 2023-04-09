// * EXCEPTIONS
import { z } from "zod"

// * TYPES AND INTERFACES
import { Request } from "express"
import { DeleteFileParams } from "../../../../../domain/utils/interfaces"

export const deleteFileByIdDto = (req: Request): DeleteFileParams => {
  const fileIdSchema = z.object({
    fileId: z.string().uuid(),
    fileName: z.string(),
  })
  const isValidFileIdSchema = fileIdSchema.safeParse(req.params)
  if (!isValidFileIdSchema.success) {
    throw isValidFileIdSchema.error
  }

  return {
    fileId: isValidFileIdSchema.data.fileId,
    fileName: isValidFileIdSchema.data.fileName,
  }
}
