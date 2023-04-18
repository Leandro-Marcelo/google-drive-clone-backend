// import { UploadedFileStatus } from "../../../domain/utils/interfaces"
import path from "path"
import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import { UuidV4Generator } from "../../../infrastructure/utils/uuidV4Generator"
import busboy from "busboy"
import { Readable } from "stream"
import {
  CreateFileDBInput,
  UploadFilesParams,
  UploadedFile,
} from "../../../domain/utils/interfaces"
import { REST_API_URL } from "../../../domain/configs"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"

export class UploadFilesUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _fileDBRepository: FileDBRepository
  private readonly _folderDBRepository: FolderDBRepository
  private readonly _uuidGenerator: UuidV4Generator

  constructor(
    fileCloudRepository: FileCloudRepository,
    fileDBRepository: FileDBRepository,
    folderDBRepository: FolderDBRepository,
    uuidGenerator: UuidV4Generator
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._fileDBRepository = fileDBRepository
    this._folderDBRepository = folderDBRepository
    this._uuidGenerator = uuidGenerator
  }

  async run(params: UploadFilesParams) {
    if (params.folderId !== null) {
      const foundFolder = await this._folderDBRepository.existFolderById(
        params.folderId
      )
      if (!foundFolder) {
        throw new NotFoundException("folder")
      }
    }

    const bb = busboy({ headers: params.req.headers })

    const uploadedFiles: Promise<any>[] = []
    const createdFiles: Promise<any>[] = []

    bb.on("file", (name: string, file: Readable, fileInfo: busboy.FileInfo) => {
      // this filename is the originalname
      const fileExt = path.extname(fileInfo.filename)
      const fileId = this._uuidGenerator.generate()
      const fileName = `${fileId}${fileExt}`

      const newFile: CreateFileDBInput = {
        id: fileId,
        fileName: fileName,
        originalName: fileInfo.filename,
        userId: params.currentUser.id,
        imgSrc: `${REST_API_URL}/api/files/${fileName}`,
        folderId: params.folderId,
      }

      createdFiles.push(this._fileDBRepository.createFile(newFile))
      uploadedFiles.push(
        this._fileCloudRepository.uploadFile({
          file,
          fileName: fileName,
        })
      )
    })
    bb.on("finish", async () => {
      const uploaded = await Promise.allSettled(uploadedFiles)
      const savedFiles = await Promise.allSettled(createdFiles)

      params.res.json(savedFiles)
    })

    bb.on("error", (err: Error) => {
      console.log("CATCHED ERROR?")
      console.log(err)
    })

    // Se setean los eventos file and finish, antes de procesar los archivos en la solicitud HTTP. Esto se puede hacer porque bb es un writable stream.
    //Finalmente, se utiliza req.pipe(bb) para pasar la solicitud HTTP al objeto bb de tipo busboy. Esto permite que busboy procese los archivos en la solicitud , ya que los archivos o la data de la petición se encuentra en la request y active los eventos file y finish cuando sea necesario.
    params.req.pipe(bb)
  }
}
