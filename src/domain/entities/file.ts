import { File as FileInPrisma } from "@prisma/client"

export interface File {
  id: string
  createdAt: Date
  fileName: string
  folderId: string | null
  originalName: string
  userId: string
  updatedAt: Date
  imgSrc: string
}
