import { z } from "zod"
import { Request } from "express"
import { CreateUserParams } from "../../../../../domain/utils/interfaces"

export const createUserDto = (req: Request): CreateUserParams => {
  const userCreateInputSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    profilePicture: z.string().nullable(),
  })

  const validatedUserCreateInput = userCreateInputSchema.safeParse(req.body)
  if (!validatedUserCreateInput.success) {
    throw validatedUserCreateInput.error
  }

  return {
    data: validatedUserCreateInput.data,
  }
}
