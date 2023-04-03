import { File } from "../../../domain/entities/file"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { GetRootFilesParams } from "../../../domain/utils/interfaces"

export class GetRootFilesUseCase {
  private readonly _fileDBRepository: FileDBRepository

  constructor(fileDBRepository: FileDBRepository) {
    this._fileDBRepository = fileDBRepository
  }

  async run(params: GetRootFilesParams): Promise<File[]> {
    const rootFiles = await this._fileDBRepository.getRootFiles(
      params.currentUser.id
    )
    return rootFiles
  }
}
