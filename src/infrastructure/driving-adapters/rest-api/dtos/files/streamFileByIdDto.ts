// * EXCEPTIONS
import { MissingFieldInParamsException } from "../../../../../domain/exceptions/MissingFieldInParamsException"
import { z } from "zod"

// * TYPES AND INTERFACES
import { Request, Response } from "express"
import { StreamFileByIdParams } from "../../../../../domain/utils/interfaces"

export const streamFileByIdDto = (
  req: Request,
  res: Response
): StreamFileByIdParams => {
  if (req.params === undefined || req.params === null) {
    throw new MissingFieldInParamsException()
  }

  const fileIdSchema = z.string().uuid().nonempty()
  const validFileIdSchema = fileIdSchema.safeParse(req.params.fileId)

  if (!validFileIdSchema.success) {
    throw validFileIdSchema.error
  }

  return {
    fileId: validFileIdSchema.data,
    res,
  }
}
