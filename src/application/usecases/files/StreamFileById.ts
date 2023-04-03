import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { StreamFileByIdParams } from "../../../domain/utils/interfaces"

export class StreamFileByIdUseCase {
  private readonly _fileCloudRepository: FileCloudRepository

  constructor(fileCloudRepository: FileCloudRepository) {
    this._fileCloudRepository = fileCloudRepository
  }

  async run(params: StreamFileByIdParams): Promise<void> {
    await this._fileCloudRepository.streamingFile(params.fileId, params.res)
    params.res.status(200).end()
  }
}
