import { File } from "../../../domain/entities/file"
import { Folder } from "../../../domain/entities/folder"
import {
  FolderDBRepository,
  GetFolderById_FolderDBRepository,
  UpdateFolderById_FolderDBRepository,
} from "../../../domain/repositories/folderDBRepository"
import { CreateFolderInputDB } from "../../../domain/utils/interfaces"
import { PrismaDBClient } from "../../driven-adapters/prisma"

export class MySQLFolderDBRepository implements FolderDBRepository {
  private readonly _prismaClient = PrismaDBClient.getInstance()

  async getFolderById({
    folderId,
  }: GetFolderById_FolderDBRepository): Promise<Folder | null> {
    const foundFolder = await this._prismaClient.folder.findUnique({
      where: {
        id: folderId,
      },
    })
    return foundFolder
  }

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
        softDeleted: false,
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
    params: UpdateFolderById_FolderDBRepository
  ): Promise<Folder> {
    return await this._prismaClient.folder.update({
      where: {
        id: params.folderId,
      },
      data: params.data,
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
    const foundFolder = await this._prismaClient.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        files: true,
        childFolders: true,
      },
    })
    return foundFolder
  }
}
