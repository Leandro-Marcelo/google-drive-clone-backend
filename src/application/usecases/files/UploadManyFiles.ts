import { REST_API_URL } from "../../../domain/configs"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import { IUuidGenerator } from "../../../domain/utils/dependencyInterfaces/uuidGenerator"
import { PrismaClient, Prisma } from "@prisma/client"
import {
  CreateFileDBInput,
  UploadManyFilesParams,
  UploadedFile,
} from "../../../domain/utils/interfaces"
import path from "path"
import { Exception } from "../../../domain/exceptions/Exception"

export class UploadManyFilesUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _folderDBRepository: FolderDBRepository
  private readonly _fileDBRepository: FileDBRepository
  private readonly _uuidGenerator: IUuidGenerator

  constructor(
    fileCloudRepository: FileCloudRepository,
    folderDBRepository: FolderDBRepository,
    fileDBRepository: FileDBRepository,
    uuidGenerator: IUuidGenerator
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._folderDBRepository = folderDBRepository
    this._fileDBRepository = fileDBRepository
    this._uuidGenerator = uuidGenerator
  }
  async run(params: UploadManyFilesParams): Promise<UploadedFile[]> {
    if (params.folderId !== null) {
      const foundFolder = await this._folderDBRepository.existFolderById(
        params.folderId
      )
      if (!foundFolder) {
        throw new NotFoundException("folder")
      }
    }

    // Se ejecuta como sincrono, es decir, si son 5 archivos, y el folderId no existe. Esto imprime
    /* 
      file 1 started
      false
      file 2 started
      false
      file 3 started
      false
      file 4 started
      false
      file 5 started
      <false></false>
      folder not found
      folder not found
      folder not found
      folder not found
      folder not found
    */
    // Por lo tanto, no sirve de nada poner un flag para saber si el folder no existe, porque ya se ejecutaron todos los archivos.
    const promises = params.files.map(async (file, idx) => {
      // console.log(`file ${idx + 1} started`)
      const ext = path.extname(file.originalname)
      const fileId = this._uuidGenerator.generate()
      const fileName = `${fileId}${ext}`
      try {
        const newFile: CreateFileDBInput = {
          id: fileId,
          fileName: fileName,
          originalName: file.originalname,
          userId: params.currentUser.id,
          imgSrc: `${REST_API_URL}/api/files/${fileName}`,
          folderId: params.folderId,
        }

        const createdFile = await this._fileDBRepository.createFile(newFile)
        // TODO: Manejar error como en el uploadFile, que haga un reject con el mensaje de error
        // handled error in the cloud repository
        await this._fileCloudRepository.uploadFile({
          file: file.buffer,
          fileName: fileName,
        })

        return createdFile
      } catch (err: any) {
        console.log(err)
        let errMsg = ""

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          //  P2003 <=> Foreign key constraint failed on the field: {folderId} is because the folderId does not exist
          if (err.code === "P2003") {
            if (err.meta) {
              if (err.meta.field_name) {
                const fieldName: string = err.meta.field_name as string
                if (fieldName.includes("folderId")) {
                  // console.log("folder not found")
                  const notFoundFolder = new NotFoundException("folder")
                  errMsg = notFoundFolder.message
                }
              }
            }
          }
        }

        // Handle error the _fileCloudRepository.uploadFile
        if (err instanceof Exception) {
          if (err.code === "UploadFileToCloudException") {
            try {
              await this._fileDBRepository.deleteFileById(fileId)
            } catch (err: any) {}
            errMsg = err.message
          }
        }

        throw {
          id: fileId,
          originalName: file.originalname,
          message: errMsg || err.message,
        }
      }
    })

    const uploadedFiles = (await Promise.allSettled(promises)) as UploadedFile[]
    return uploadedFiles
  }
}
