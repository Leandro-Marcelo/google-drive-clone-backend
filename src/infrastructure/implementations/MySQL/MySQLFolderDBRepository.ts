import { Folder } from "../../../domain/entities/folder"
import { FolderDBRepository } from "../../../domain/repositories/folderDBRepository"
import {
  CreateFolderInput,
  UpdateFolderInput,
} from "../../../domain/utils/interfaces"
import { PrismaDBClient } from "../../driven-adapters/prisma"

export class MySQLFolderDBRepository implements FolderDBRepository {
  private readonly _prismaClient = PrismaDBClient.getInstance()

  async getRootFolders(currentUserId: string): Promise<Folder[]> {
    const folders = await this._prismaClient.folder.findMany({
      where: {
        userId: currentUserId,
      },
    })
    return folders
  }

  async createFolder(createFolderInput: CreateFolderInput): Promise<Folder> {
    return await this._prismaClient.folder.create({
      data: createFolderInput,
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

  async getFolderById(folderId: string): Promise<Folder | null> {
    const foundFile = await this._prismaClient.folder.findUnique({
      where: {
        id: folderId,
      },
    })
    return foundFile
  }
}
