import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { DeleteFileByIdParams } from "../../../domain/utils/interfaces"
import { File } from "../../../domain/entities/file"

export class DeleteFileByIdUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _fileDBRepository: FileDBRepository

  constructor(
    fileCloudRepository: FileCloudRepository,
    fileDBRepository: FileDBRepository
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._fileDBRepository = fileDBRepository
  }

  async run(params: DeleteFileByIdParams): Promise<File> {
    await this._fileCloudRepository.removeFile(params.id)
    const deletedFile = await this._fileDBRepository.deleteFileById(params.id)
    return deletedFile
  }
}
