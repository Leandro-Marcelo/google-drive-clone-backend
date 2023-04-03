import { Folder } from "../entities/folder"
import { CreateFolderInput } from "../utils/interfaces"

export interface FolderDBRepository {
  createFolder: (createFolderInput: CreateFolderInput) => Promise<Folder>
  deleteFolderById: (folderId: string) => Promise<Folder>
  getRootFolders: (currentUserId: string) => Promise<Folder[]>
  updateFolderById: (
    folderId: string,
    createFolderInput: Folder
  ) => Promise<Folder>
  getFolderById: (folderId: string) => Promise<Folder | null>
}
