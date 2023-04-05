import { Folder } from "../entities/folder"
import { CreateFolderInputDB, UpdateFolderInput } from "../utils/interfaces"

export interface FolderDBRepository {
  createFolder: (createFolderInputDB: CreateFolderInputDB) => Promise<Folder>
  deleteFolderById: (folderId: string) => Promise<Folder>
  getRootFolders: (currentUserId: string) => Promise<Folder[]>
  updateFolderById: (
    folderId: string,
    createFolderInputDB: UpdateFolderInput
  ) => Promise<Folder>
  getFolderById: (folderId: string) => Promise<Folder | null>
}
