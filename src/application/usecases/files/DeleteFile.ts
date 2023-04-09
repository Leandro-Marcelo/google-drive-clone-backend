import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { DeleteFileParams } from "../../../domain/utils/interfaces"
import { File } from "../../../domain/entities/file"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"

export class DeleteFileUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _fileDBRepository: FileDBRepository

  constructor(
    fileCloudRepository: FileCloudRepository,
    fileDBRepository: FileDBRepository
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._fileDBRepository = fileDBRepository
  }

  async run(params: DeleteFileParams): Promise<File> {
    const foundFile = await this._fileDBRepository.getFileById({
      fileId: params.fileId,
    })
    if (foundFile === null) {
      throw new NotFoundException("file")
    }

    await this._fileCloudRepository.removeFile({
      fileName: foundFile.fileName,
    })
    const deletedFile = await this._fileDBRepository.deleteFileById(
      params.fileId
    )
    return deletedFile
  }
}
