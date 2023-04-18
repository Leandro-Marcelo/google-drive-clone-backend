import { z } from "zod"
import { Request } from "express"
import { UpdateFileByIdParams } from "../../../../../domain/utils/interfaces"

export const updateFileByIdDto = (req: Request): UpdateFileByIdParams => {
  const paramsSchema = z.object({
    fileId: z.string().uuid(),
  })

  const bodySchema = z.object({
    originalName: z.string().min(3),
    folderId: z.string().uuid().nullable(),
    softDeleted: z.boolean(),
  })

  const isValidParamsSchema = paramsSchema.safeParse(req.params)
  if (!isValidParamsSchema.success) {
    throw isValidParamsSchema.error
  }

  const isValidBodySchema = bodySchema.safeParse(req.body)
  if (!isValidBodySchema.success) {
    throw isValidBodySchema.error
  }

  return {
    fileId: isValidParamsSchema.data.fileId,
    data: {
      originalName: isValidBodySchema.data.originalName,
      folderId: isValidBodySchema.data.folderId,
      softDeleted: isValidBodySchema.data.softDeleted,
    },
  }
}
