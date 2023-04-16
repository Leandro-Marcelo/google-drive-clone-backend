import { File as FileInPrisma } from "@prisma/client"

export interface File {
  id: string
  fileName: string
  folderId: string | null
  originalName: string
  userId: string
  createdAt: Date
  updatedAt: Date
  imgSrc: string
  softDeleted: boolean
}
