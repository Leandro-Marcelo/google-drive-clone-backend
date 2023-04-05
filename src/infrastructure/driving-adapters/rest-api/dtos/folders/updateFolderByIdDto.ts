import { z } from "zod"
import { Request } from "express"
import { UpdateFolderByIdParams } from "../../../../../domain/utils/interfaces"

export const updateFolderByIdDto = (req: Request): UpdateFolderByIdParams => {
  const folderIdSchema = z.object({
    folderId: z.string().uuid(),
  })

  const validFolderIdSchema = folderIdSchema.safeParse(req.params)
  if (!validFolderIdSchema.success) {
    throw validFolderIdSchema.error
  }

  const updateFolderSchema = z.object({
    originalName: z.string().min(3),
    parentFolderId: z.string().nullable(),
  })

  const validUpdateFolderSchema = updateFolderSchema.safeParse(req.body)
  if (!validUpdateFolderSchema.success) {
    throw validUpdateFolderSchema.error
  }

  return {
    folderId: validFolderIdSchema.data.folderId,
    data: validUpdateFolderSchema.data,
  }
}
