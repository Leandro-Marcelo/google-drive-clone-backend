import { File } from "../entities/file"
import { Folder } from "../entities/folder"
import { CreateFolderInputDB, UpdateFolderInput } from "../utils/interfaces"

export interface GetFolderById_FolderDBRepository {
  folderId: string
}

export interface FolderDBRepository {
  existFolderById: (folderId: string) => Promise<boolean>
  getFolderById: (
    params: GetFolderById_FolderDBRepository
  ) => Promise<Folder | null>
  createFolder: (createFolderInputDB: CreateFolderInputDB) => Promise<Folder>
  deleteFolderById: (folderId: string) => Promise<Folder>
  getRootFolders: (currentUserId: string) => Promise<Folder[]>
  updateFolderById: (
    folderId: string,
    createFolderInputDB: UpdateFolderInput
  ) => Promise<Folder>
  getFolderContents: (folderId: string) => Promise<
    | (Folder & {
        childFolders: Folder[]
        files: File[]
      })
    | null
  >
}
