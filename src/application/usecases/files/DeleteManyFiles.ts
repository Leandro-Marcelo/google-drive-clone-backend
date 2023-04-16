import { FileCloudRepository } from "../../../domain/repositories/fileCloudRepository"
import { FileDBRepository } from "../../../domain/repositories/fileDBRepository"
import {
  DeleteManyFilesParams,
  DeletedFile,
  UploadedFile,
} from "../../../domain/utils/interfaces"
import { File } from "../../../domain/entities/file"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"

export class DeleteManyFilesUseCase {
  private readonly _fileCloudRepository: FileCloudRepository
  private readonly _fileDBRepository: FileDBRepository

  constructor(
    fileCloudRepository: FileCloudRepository,
    fileDBRepository: FileDBRepository
  ) {
    this._fileCloudRepository = fileCloudRepository
    this._fileDBRepository = fileDBRepository
  }

  async run(filesToDelete: string[]): Promise<void> {
    /* const promises = filesToDelete.map(async (file) => {
      const foundFile = await this._fileDBRepository.getFileById({
        fileId: file.id,
      })

      if (foundFile === null) {
        throw new NotFoundException("file")
      }

      const deletedFile = await this._fileDBRepository.deleteFileById(file.id)

      await this._fileCloudRepository.removeFile({
        fileName: foundFile.fileName,
      })

      return deletedFile
    })

    const deletedFiles = (await Promise.allSettled(promises)) as DeletedFile[]
    return deletedFiles */
  }
}
