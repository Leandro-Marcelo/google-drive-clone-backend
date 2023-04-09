import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { StreamFileByIdParams } from "../../../domain/utils/interfaces"

export class StreamFileByIdUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _fileDBRepository: FileDBRepository

  constructor(
    fileCloudRepository: FileCloudRepository,
    fileDBRepository: FileDBRepository
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._fileDBRepository = fileDBRepository
  }

  async run(params: StreamFileByIdParams): Promise<void> {
    const foundFile = await this._fileDBRepository.getFileById({
      fileId: params.fileId,
    })

    if (!foundFile) {
      params.res.status(404).end()
      return
    }

    await this._fileCloudRepository.streamingFile(
      foundFile.fileName,
      params.res
    )
    params.res.status(200).end()
  }
}
