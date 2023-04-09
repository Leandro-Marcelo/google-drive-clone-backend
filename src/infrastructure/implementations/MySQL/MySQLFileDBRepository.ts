import { File } from "../../../domain/entities/file"
import {
  ExistFileByFileName_FileDBRepository,
  ExistFileById_FileDBRepository,
  FileDBRepository,
} from "../../../domain/repositories/fileDBRepository"
import { CreateFileDBInput } from "../../../domain/utils/interfaces"
import { PrismaDBClient } from "../../driven-adapters/prisma"

export class MySQLFileDBRepository implements FileDBRepository {
  private readonly _prismaClient = PrismaDBClient.getInstance()

  async existFileById({
    fileId,
  }: ExistFileById_FileDBRepository): Promise<boolean> {
    const foundFile = await this._prismaClient.file.findUnique({
      where: {
        id: fileId,
      },
      select: {
        id: true,
      },
    })
    return foundFile !== null
  }

  async existFileByFileName({
    fileName,
  }: ExistFileByFileName_FileDBRepository): Promise<boolean> {
    const foundFile = await this._prismaClient.file.findUnique({
      where: {
        fileName,
      },
      select: {
        id: true,
      },
    })
    return foundFile !== null
  }

  async getRootFiles(currentUserId: string): Promise<File[]> {
    const files = await this._prismaClient.file.findMany({
      where: {
        folderId: null,
        userId: currentUserId,
      },
    })
    return files
  }

  async createFile(file: CreateFileDBInput): Promise<File> {
    return await this._prismaClient.file.create({
      data: file,
    })
  }

  async updateFileById(fileId: string, productImage: File): Promise<File> {
    return await this._prismaClient.file.update({
      where: {
        id: fileId,
      },
      data: productImage,
    })
  }

  async deleteFileById(fileId: string): Promise<File> {
    return await this._prismaClient.file.delete({
      where: {
        id: fileId,
      },
    })
  }

  async getFileById({
    fileId,
  }: ExistFileById_FileDBRepository): Promise<File | null> {
    const foundFile = await this._prismaClient.file.findUnique({
      where: {
        id: fileId,
      },
    })
    return foundFile
  }
}
