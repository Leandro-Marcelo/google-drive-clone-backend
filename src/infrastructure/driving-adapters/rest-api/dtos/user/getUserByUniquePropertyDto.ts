import { z } from "zod"
import { Request } from "express"
import { GetUserParams } from "../../../../../domain/utils/interfaces"

export const getUserByUniquePropertyDto = (req: Request): GetUserParams => {
  const findUserConditionsSchema = z.union([
    z.object({
      id: z.string().uuid(),
      email: z.undefined(),
    }),
    z.object({
      id: z.undefined(),
      email: z.string().email(),
    }),
  ])

  const validatedFindUserConditionsSchema = findUserConditionsSchema.safeParse(
    req.query
  )

  if (!validatedFindUserConditionsSchema.success) {
    throw validatedFindUserConditionsSchema.error
  }

  return {
    condition: validatedFindUserConditionsSchema.data.id ? "id" : "email",
    conditionValue:
      validatedFindUserConditionsSchema.data.id ??
      validatedFindUserConditionsSchema.data.email,
  }
}
