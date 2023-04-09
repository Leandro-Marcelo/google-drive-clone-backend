import { Response } from "express"

export interface UploadFile_FileCloudRepository {
  fileBuffer: Buffer
  fileName: string
}

export interface StreamingFile_FileCloudRepository {
  fileId: string
}

export interface RemoveFile_FileCloudRepository {
  fileName: string
}

// Los objetos no se pueden actualizar simplemente se borran y se crean nuevos, por eso no hay update
export interface FileCloudRepository {
  // El retorno va con respecto a que retornaría el método en si, por ejemplo el buscar o te tirá el usuario porque lo encontró la DB o un null porque no lo encontró. Los errores ya son manejados por el caso de uso
  streamingFile: (fileId: string, res: Response) => Promise<void>
  // Pasamos un buffer porque tanto en AWS como en GCP necesitan de un fileName que sea único y el archivo en buffer o el buffer del archivo que es lo mismo xd
  // Should return fileName

  // fileBuffer: A Buffer containing the entire file.
  // uploadFile: (fileBuffer: Buffer, fileName: string) => Promise<void>
  uploadFile: (params: UploadFile_FileCloudRepository) => Promise<void>
  removeFile: (params: RemoveFile_FileCloudRepository) => Promise<void>
}
