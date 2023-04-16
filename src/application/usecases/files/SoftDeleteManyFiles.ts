import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { DeletedFile } from "../../../domain/utils/interfaces"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"

export class SoftDeleteManyFilesUseCase {
  private readonly _fileDBRepository: FileDBRepository

  constructor(fileDBRepository: FileDBRepository) {
    this._fileDBRepository = fileDBRepository
  }

  async run(filesIdsToSoftDelete: string[]): Promise<DeletedFile[]> {
    const promises = filesIdsToSoftDelete.map(async (fileId) => {
      const foundFile = await this._fileDBRepository.getFileById({
        fileId,
      })

      if (foundFile === null) {
        throw new NotFoundException("file")
      }

      const updatedFileDB = await this._fileDBRepository.updateFileById({
        fileId,
        data: {
          originalName: foundFile.originalName,
          folderId: foundFile.folderId,
          softDeleted: true,
        },
      })

      return updatedFileDB
    })

    const updatedFilesDB = (await Promise.allSettled(promises)) as DeletedFile[]
    return updatedFilesDB
  }
}
