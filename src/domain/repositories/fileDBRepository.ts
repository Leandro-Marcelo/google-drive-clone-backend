import { File } from "../entities/file"
import { CreateFileDBInput } from "../utils/interfaces"

// Los objetos no se pueden actualizar simplemente se borran y se crean nuevos, por eso no hay update
export interface FileDBRepository {
  getAllFiles: () => Promise<File[]>
  createFile: (file: CreateFileDBInput) => Promise<File>
  updateFileById: (fileId: string, productImage: File) => Promise<File>
  deleteFileById: (fileId: string) => Promise<File>
  getFileById: (fileId: string) => Promise<File | null>
}
