import { z } from "zod"
import { Request } from "express"
import { UpdateUserByIdParams } from "../../../../../domain/utils/interfaces"

export const updateUserByIdDto = (req: Request): UpdateUserByIdParams => {
  const userIdSchema = z.object({
    userId: z.string().uuid(),
  })

  const validatedUserId = userIdSchema.safeParse(req.params)
  if (!validatedUserId.success) {
    throw validatedUserId.error
  }

  const partialUserCreateInputSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).nullable(),
    profilePicture: z.string().nullable(),
  })

  const validatedPartialUserCreateInputSchema =
    partialUserCreateInputSchema.safeParse(req.body)
  if (!validatedPartialUserCreateInputSchema.success) {
    throw validatedPartialUserCreateInputSchema.error
  }

  return {
    userId: validatedUserId.data.userId,
    data: validatedPartialUserCreateInputSchema.data,
  }
}
