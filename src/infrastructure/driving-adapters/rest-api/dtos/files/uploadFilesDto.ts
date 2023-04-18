import { z } from "zod"
import { Request } from "express"

export const uploadFilesDto = (req: Request): string | null => {
  const folderIdSchema = z.string()
  const validFolderIdSchema = folderIdSchema.safeParse(req.params.folderId)
  if (!validFolderIdSchema.success) {
    throw validFolderIdSchema.error
  }

  return validFolderIdSchema.data === "null" ? null : validFolderIdSchema.data
}
