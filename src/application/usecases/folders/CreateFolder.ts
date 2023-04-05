import {
  CreateFolderInputDB,
  CreateFolderParams,
} from "../../../domain/utils/interfaces"
import { IUuidGenerator } from "../../../domain/utils/dependencyInterfaces/uuidGenerator"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import { Folder } from "../../../domain/entities/folder"

export class CreateFolderUseCase {
  private readonly _folderDBRepository: FolderDBRepository
  private readonly _uuidGenerator: IUuidGenerator

  constructor(
    folderDBRepository: FolderDBRepository,
    uuidGenerator: IUuidGenerator
  ) {
    this._folderDBRepository = folderDBRepository
    this._uuidGenerator = uuidGenerator
  }

  async run(params: CreateFolderParams): Promise<Folder> {
    const newFolderId = this._uuidGenerator.generate()
    const newFolder: CreateFolderInputDB = {
      ...params.data,
      id: newFolderId,
    }
    const createdFolder = await this._folderDBRepository.createFolder(newFolder)
    return createdFolder
  }
}
