import { z } from "zod"
import { Request } from "express"
import {
  CreateFolderParams,
  CreateUserParams,
} from "../../../../../domain/utils/interfaces"

export const createFolderDto = (req: Request): CreateFolderParams => {
  const createFolderInputSchema = z.object({
    originalName: z.string().min(3),
    parentFolderId: z.string().nullable(),
  })

  const validCreateFolderInputSchema = createFolderInputSchema.safeParse(
    req.body
  )
  if (!validCreateFolderInputSchema.success) {
    throw validCreateFolderInputSchema.error
  }

  return {
    data: {
      ...validCreateFolderInputSchema.data,
      userId: req.currentUser.id,
    },
    currentUser: req.currentUser,
  }
}
