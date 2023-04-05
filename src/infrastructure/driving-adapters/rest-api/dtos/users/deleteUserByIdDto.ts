import { z } from "zod"
import { Request } from "express"
import { DeleteUserByIdParams } from "../../../../../domain/utils/interfaces"

export const deleteUserByIdDto = (req: Request): DeleteUserByIdParams => {
  const userIdSchema = z.object({
    userId: z.string().uuid(),
  })

  const validatedUserId = userIdSchema.safeParse(req.params)
  if (!validatedUserId.success) {
    throw validatedUserId.error
  }

  return {
    userId: validatedUserId.data.userId,
  }
}
