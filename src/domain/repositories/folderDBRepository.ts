import { File } from "../entities/file"
import { CreateFileDBInput } from "../utils/interfaces"

export interface FolderDBRepository {
  createFile: (file: CreateFileDBInput) => Promise<File>
  deleteFileById: (fileId: string) => Promise<File>

  getAllFiles: () => Promise<File[]>

  updateFileById: (fileId: string, productImage: File) => Promise<File>
  getFileById: (fileId: string) => Promise<File | null>
}
