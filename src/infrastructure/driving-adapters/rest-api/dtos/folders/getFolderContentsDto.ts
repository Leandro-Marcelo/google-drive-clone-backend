import { z } from "zod"
import { Request } from "express"
import { GetFolderContentsParams } from "../../../../../domain/utils/interfaces"

export const getFolderContentsDto = (req: Request): GetFolderContentsParams => {
  const getFolderContentsSchema = z.object({
    folderId: z.string().uuid(),
  })

  const validatedGetFolderContentsSchema = getFolderContentsSchema.safeParse(
    req.params
  )

  if (!validatedGetFolderContentsSchema.success) {
    throw validatedGetFolderContentsSchema.error
  }

  return {
    folderId: validatedGetFolderContentsSchema.data.folderId,
  }
}
