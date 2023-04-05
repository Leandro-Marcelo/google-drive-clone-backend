import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { DeleteFolderByIdParams } from "../../../domain/utils/interfaces"
import { Folder } from "../../../domain/entities/folder"

export class DeleteFolderByIdUseCase {
  private readonly _folderRepository: FolderDBRepository

  constructor(folderRepository: FolderDBRepository) {
    this._folderRepository = folderRepository
  }

  async run(params: DeleteFolderByIdParams): Promise<Folder> {
    const foundFolder = await this._folderRepository.getFolderById(
      params.folderId
    )
    if (foundFolder === null) {
      throw new NotFoundException("folder")
    }

    return this._folderRepository.deleteFolderById(params.folderId)
  }
}
