import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { StreamFileByFileNameParams } from "../../../domain/utils/interfaces"

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

  async run(params: StreamFileByFileNameParams): Promise<void> {
    const existFile = await this._fileDBRepository.existFileByFileName({
      fileName: params.fileName,
    })

    if (!existFile) {
      params.res.status(404).end()
      return
    }

    await this._fileCloudRepository.streamingFile(params.fileName, params.res)
    params.res.status(200).end()
  }
}
