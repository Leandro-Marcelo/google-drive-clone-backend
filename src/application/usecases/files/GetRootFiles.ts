import { File } from "../../../domain/entities/file"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"

export class GetRootFilesUseCase {
  private readonly _fileDBRepository: FileDBRepository

  constructor(fileDBRepository: FileDBRepository) {
    this._fileDBRepository = fileDBRepository
  }

  async run(currentUserId: string): Promise<File[]> {
    const rootFiles = await this._fileDBRepository.getRootFiles(currentUserId)
    return rootFiles
  }
}
