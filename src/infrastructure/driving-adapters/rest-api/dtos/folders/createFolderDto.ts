import { z } from "zod"
import { Request } from "express"
import {
  CreateFolderParams,
  CreateUserParams,
} from "../../../../../domain/utils/interfaces"

export const createFolderDto = (req: Request): CreateFolderParams => {
  const createFolderSchema = z.object({
    originalName: z.string().min(3),
    parentFolderId: z.string().nullable(),
  })

  const validCreateFolderSchema = createFolderSchema.safeParse(req.body)
  if (!validCreateFolderSchema.success) {
    throw validCreateFolderSchema.error
  }

  return {
    data: {
      ...validCreateFolderSchema.data,
      userId: req.currentUser.id,
    },
    currentUser: req.currentUser,
  }
}
