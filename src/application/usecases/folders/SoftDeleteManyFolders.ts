import { DeletedFile } from "../../../domain/utils/interfaces"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"

export class SoftDeleteManyFoldersUseCase {
  private readonly _folderDBRepository: FolderDBRepository

  constructor(folderDBRepository: FolderDBRepository) {
    this._folderDBRepository = folderDBRepository
  }

  async run(foldersIdsToSoftDelete: string[]): Promise<DeletedFile[]> {
    const promises = foldersIdsToSoftDelete.map(async (folderId) => {
      const foundFolder = await this._folderDBRepository.getFolderById({
        folderId,
      })

      if (foundFolder === null) {
        throw new NotFoundException("folder")
      }

      const updatedFileDB = await this._folderDBRepository.updateFolderById({
        folderId,

        data: {
          softDeleted: true,
          originalName: foundFolder.originalName,
          parentFolderId: foundFolder.parentFolderId,
        },
      })

      return updatedFileDB
    })

    const updatedFoldersDB = (await Promise.allSettled(
      promises
    )) as DeletedFile[]
    return updatedFoldersDB
  }
}
