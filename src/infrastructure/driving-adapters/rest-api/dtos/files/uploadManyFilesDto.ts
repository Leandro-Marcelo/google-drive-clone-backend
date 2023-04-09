import { z } from "zod"
import { Request } from "express"
import {
  FileUploadInput,
  UploadManyFilesParams,
} from "../../../../../domain/utils/interfaces"

export const uploadManyFilesDto = (req: Request): UploadManyFilesParams => {
  const folderIdSchema = z.object({
    folderId: z.string().uuid().optional(),
  })
  const validFolderIdSchema = folderIdSchema.safeParse(req.body)
  if (!validFolderIdSchema.success) {
    throw validFolderIdSchema.error
  }

  const userCreateInputSchema = z.array(
    z.object({
      originalname: z.string(),
      mimetype: z.string(),
      size: z.number(),
      // buffer: z.buffer(),
    })
  )

  const validUserCreateInputSchema = userCreateInputSchema.safeParse(req.files)
  if (!validUserCreateInputSchema.success) {
    throw validUserCreateInputSchema.error
  }

  const files = req.files as FileUploadInput[]

  return {
    currentUser: req.currentUser,
    folderId: validFolderIdSchema.data.folderId
      ? validFolderIdSchema.data.folderId
      : null,
    files,
  }
}
