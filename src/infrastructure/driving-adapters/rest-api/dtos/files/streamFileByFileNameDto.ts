// * EXCEPTIONS
import { MissingFieldInParamsException } from "../../../../../domain/exceptions/MissingFieldInParamsException"
import { z } from "zod"

// * TYPES AND INTERFACES
import { Request, Response } from "express"
import { StreamFileByFileNameParams } from "../../../../../domain/utils/interfaces"

export const streamFileByFileNameDto = (
  req: Request,
  res: Response
): StreamFileByFileNameParams => {
  const fileNameSchema = z.string().nonempty()
  const isValidFileNameSchema = fileNameSchema.safeParse(req.params.fileName)

  if (!isValidFileNameSchema.success) {
    throw isValidFileNameSchema.error
  }

  return {
    fileName: isValidFileNameSchema.data,
    res,
  }
}
