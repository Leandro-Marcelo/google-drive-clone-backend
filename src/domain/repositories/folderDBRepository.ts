import { File } from "../entities/file"
import { Folder } from "../entities/folder"
import { CreateFolderInputDB, UpdateFolderDBInput } from "../utils/interfaces"

export interface GetFolderById_FolderDBRepository {
  folderId: string
}

export interface UpdateFolderById_FolderDBRepository {
  folderId: string
  data: UpdateFolderDBInput
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
    params: UpdateFolderById_FolderDBRepository
  ) => Promise<Folder>
  getFolderContents: (folderId: string) => Promise<
    | (Folder & {
        childFolders: Folder[]
        files: File[]
      })
    | null
  >
}
