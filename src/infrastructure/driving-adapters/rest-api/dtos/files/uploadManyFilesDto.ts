import { z } from "zod"
import { Request } from "express"
import {
  FileUploadInput,
  UploadManyFilesParams,
} from "../../../../../domain/utils/interfaces"

export const uploadManyFilesDto = (req: Request): UploadManyFilesParams => {
  const currentUserSchema = z.object({
    id: z.string(),
    active: z.boolean(),
    name: z.string(),
    email: z.string().email(),
    profilePicture: z.string().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
  const validCurrentUserSchema = currentUserSchema.safeParse(req.currentUser)
  if (!validCurrentUserSchema.success) {
    throw validCurrentUserSchema.error
  }

  const folderIdSchema = z.string()
  const validFolderIdSchema = folderIdSchema.safeParse(req.params.folderId)
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
    currentUser: validCurrentUserSchema.data,
    folderId: validFolderIdSchema.data,
    files,
  }
}
