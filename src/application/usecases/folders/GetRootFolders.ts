import { File } from "../../../domain/entities/file"
import { Folder } from "../../../domain/entities/folder"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"

export class GetRootFoldersUseCase {
  private readonly _folderDBRepository: FolderDBRepository

  constructor(fileDBRepository: FolderDBRepository) {
    this._folderDBRepository = fileDBRepository
  }

  async run(currentUserId: string): Promise<Folder[]> {
    const rootFolders = await this._folderDBRepository.getRootFolders(
      currentUserId
    )
    return rootFolders
  }
}
