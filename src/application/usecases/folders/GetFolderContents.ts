import { File } from "../../../domain/entities/file"
import { Folder } from "../../../domain/entities/folder"
import { User } from "../../../domain/entities/user"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import { UserRepository } from "../../../domain/repositories/userRepository"
import {
  GetFolderContentsParams,
  GetUserParams,
} from "../../../domain/utils/interfaces"

export class GetFolderContentsUseCase {
  private readonly _folderDBRepository: FolderDBRepository

  constructor(folderDBRepository: FolderDBRepository) {
    this._folderDBRepository = folderDBRepository
  }

  async run(params: GetFolderContentsParams): Promise<
    Folder & {
      childFolders: Folder[]
      files: File[]
    }
  > {
    const folderContents = await this._folderDBRepository.getFolderContents(
      params.folderId
    )

    if (folderContents === null) {
      throw new NotFoundException("folder")
    }

    return folderContents
  }
}
