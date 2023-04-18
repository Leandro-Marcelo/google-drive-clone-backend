import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { UpdateFolderByIdParams } from "../../../domain/utils/interfaces"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import { Folder } from "../../../domain/entities/folder"

export class UpdateFolderByIdUseCase {
  private readonly _folderRepository: FolderDBRepository

  constructor(folderRepository: FolderDBRepository) {
    this._folderRepository = folderRepository
  }

  async run(params: UpdateFolderByIdParams): Promise<Folder> {
    const foundFolder = await this._folderRepository.getFolderById({
      folderId: params.folderId,
    })
    if (foundFolder === null) {
      throw new NotFoundException("folder")
    }

    return await this._folderRepository.updateFolderById(params)
  }
}
