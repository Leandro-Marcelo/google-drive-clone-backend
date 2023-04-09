import { File } from "../entities/file"
import { CreateFileDBInput, UpdateFileDBInput } from "../utils/interfaces"

export interface ExistFileById_FileDBRepository {
  fileId: string
}

export interface ExistFileByFileName_FileDBRepository {
  fileName: string
}

export interface GetFileById_FileDBRepository {
  fileId: string
}

export interface UpdateFileById_FileDBRepository {
  fileId: string
  data: UpdateFileDBInput
}

// Los objetos no se pueden actualizar simplemente se borran y se crean nuevos, por eso no hay update
export interface FileDBRepository {
  existFileById: (params: ExistFileById_FileDBRepository) => Promise<boolean>
  existFileByFileName: (
    params: ExistFileByFileName_FileDBRepository
  ) => Promise<boolean>
  createFile: (file: CreateFileDBInput) => Promise<File>
  deleteFileById: (fileId: string) => Promise<File>
  getRootFiles: (currentUserId: string) => Promise<File[]>

  updateFileById: (params: UpdateFileById_FileDBRepository) => Promise<File>
  getFileById: (params: GetFileById_FileDBRepository) => Promise<File | null>
}
