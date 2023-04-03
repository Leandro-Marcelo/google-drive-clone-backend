import { REST_API_URL } from "../../../domain/configs"
import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { IUuidGenerator } from "../../../domain/utils/dependencyInterfaces/uuidGenerator"
import {
  CreateFileDBInput,
  UploadManyFilesParams,
  UploadedFile,
} from "../../../domain/utils/interfaces"
import path from "path"

export class UploadManyFilesUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _fileDBRepository: FileDBRepository
  private readonly _uuidGenerator: IUuidGenerator

  constructor(
    fileCloudRepository: FileCloudRepository,
    fileDBRepository: FileDBRepository,
    uuidGenerator: IUuidGenerator
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._fileDBRepository = fileDBRepository
    this._uuidGenerator = uuidGenerator
  }
  async run(params: UploadManyFilesParams): Promise<UploadedFile[]> {
    const promises = params.files.map(async (file) => {
      const ext = path.extname(file.originalname)
      const newFileId = `${this._uuidGenerator.generate()}${ext}`
      try {
        const newFile: CreateFileDBInput = {
          id: newFileId,
          fileName: newFileId,
          originalName: file.originalname,
          userId: params.currentUser.id,
          imgSrc: `${REST_API_URL}/api/files/${newFileId}`,
          folderId: params.folderId === "null" ? null : params.folderId,
        }

        const createdFile = await this._fileDBRepository.createFile(newFile)
        // TODO: Manejar error como en el uploadFile, que haga un reject con el mensaje de error
        // handled error in the cloud repository
        await this._fileCloudRepository.uploadFile(file.buffer, newFileId)

        return createdFile
      } catch (error: any) {
        try {
          await this._fileDBRepository.deleteFileById(newFileId)
        } catch (err: any) {
          console.log(err)
        }
        throw {
          id: newFileId,
          originalName: file.originalname,
          message: error.message,
        }
      }
    })

    const uploadedFiles = (await Promise.allSettled(promises)) as UploadedFile[]
    return uploadedFiles
  }
}
