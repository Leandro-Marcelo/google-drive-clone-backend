// * EXCEPTIONS
import { MissingFieldInParamsException } from "../../../../../domain/exceptions/MissingFieldInParamsException"

// * TYPES AND INTERFACES
import { Request } from "express"
import { DeleteFileByIdParams } from "../../../../../domain/utils/interfaces"

export const deleteFileByIdDto = (req: Request): DeleteFileByIdParams => {
  if (req.params === undefined || req.params === null) {
    throw new MissingFieldInParamsException()
  }

  const { fileId } = req.params

  if (fileId === undefined || fileId === null || fileId === "") {
    throw new MissingFieldInParamsException()
  }

  return {
    id: fileId,
  }
}
