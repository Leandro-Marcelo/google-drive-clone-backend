import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { UpdateFileByIdParams } from "../../../domain/utils/interfaces"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"

export class UpdateFileByIdUseCase {
  private readonly _fileDBRepository: FileDBRepository

  constructor(fileDBRepository: FileDBRepository) {
    this._fileDBRepository = fileDBRepository
  }

  async run(params: UpdateFileByIdParams) {
    const foundFile = await this._fileDBRepository.getFileById({
      fileId: params.fileId,
    })

    if (foundFile === null) {
      throw new NotFoundException("file")
    }

    return await this._fileDBRepository.updateFileById({
      fileId: params.fileId,
      data: params.data,
    })
  }
}
