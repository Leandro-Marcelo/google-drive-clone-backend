import { Folder as FolderInPrisma } from "@prisma/client"

export interface Folder {
  id: string
  createdAt: Date
  originalName: string
  userId: string
  updatedAt: Date
  parentFolderId: string | null
}
