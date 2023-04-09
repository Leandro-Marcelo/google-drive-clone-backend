import { File } from "../../../domain/entities/file"
import { Folder } from "../../../domain/entities/folder"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import {
  CreateFolderInputDB,
  UpdateFolderInput,
} from "../../../domain/utils/interfaces"
import { PrismaDBClient } from "../../driven-adapters/prisma"

export class MySQLFolderDBRepository implements FolderDBRepository {
  private readonly _prismaClient = PrismaDBClient.getInstance()

  async existFolderById(folderId: string): Promise<boolean> {
    const foundFolder = await this._prismaClient.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        id: true,
      },
    })
    return foundFolder !== null
  }

  async getRootFolders(currentUserId: string): Promise<Folder[]> {
    const folders = await this._prismaClient.folder.findMany({
      where: {
        parentFolderId: null,
        userId: currentUserId,
      },
    })
    return folders
  }

  async createFolder(
    createFolderInputDB: CreateFolderInputDB
  ): Promise<Folder> {
    return await this._prismaClient.folder.create({
      data: createFolderInputDB,
    })
  }

  async updateFolderById(
    folderId: string,
    updateFolderInput: UpdateFolderInput
  ): Promise<Folder> {
    return await this._prismaClient.folder.update({
      where: {
        id: folderId,
      },
      data: updateFolderInput,
    })
  }

  async deleteFolderById(folderId: string): Promise<Folder> {
    return await this._prismaClient.folder.delete({
      where: {
        id: folderId,
      },
    })
  }

  async getFolderContents(folderId: string): Promise<
    | (Folder & {
        childFolders: Folder[]
        files: File[]
      })
    | null
  > {
    const foundFile = await this._prismaClient.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        files: true,
        childFolders: true,
      },
    })
    return foundFile
  }
}
