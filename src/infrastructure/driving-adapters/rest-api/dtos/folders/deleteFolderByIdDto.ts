import { z } from "zod"
import { Request } from "express"
import { DeleteFolderByIdParams } from "../../../../../domain/utils/interfaces"

export const deleteFolderByIdDto = (req: Request): DeleteFolderByIdParams => {
  const folderIdSchema = z.object({
    folderId: z.string().uuid(),
  })

  const validFolderIdSchema = folderIdSchema.safeParse(req.params)
  if (!validFolderIdSchema.success) {
    throw validFolderIdSchema.error
  }

  return {
    folderId: validFolderIdSchema.data.folderId,
  }
}
