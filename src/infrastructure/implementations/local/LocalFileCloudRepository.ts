import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { Response } from "express"
import { Readable } from "stream"
import fs from "fs"
import path from "path"

import {
  FileCloudRepository,
  RemoveFile_FileCloudRepository,
  UploadFile_FileCloudRepository,
} from "../../../domain/repositories/fileCloudRepository"

export class LocalFileCloudRepository implements FileCloudRepository {
  async streamingFile(filename: string, res: Response): Promise<void> {
    const filePath = path.join(__dirname, `./files/${filename}`)
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("File")
    }

    const fileBuffer = fs.readFileSync(filePath)
    const readableFile = Readable.from(fileBuffer)
    return new Promise((resolve, reject) => {
      readableFile.on("error", (error: any) => {
        console.log(error)
        if (error.code === 404) {
          return reject(new NotFoundException("File"))
        }
        return reject(new Error("Error streaming file on local storage"))
      })
      readableFile.pipe(res)
      readableFile.on("end", () => {
        resolve()
      })
    })
  }

  async removeFile(params: RemoveFile_FileCloudRepository): Promise<void> {
    const filePath = path.join(__dirname, `./files/${params.fileName}`)
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("File")
    }

    try {
      fs.unlinkSync(filePath)
    } catch (err: any) {
      console.log(err)
      if (err.code === 404) {
        throw new NotFoundException("File")
      }
      throw new Error("Error deleting file on local storage")
    }
  }

  // Si guardas un archivo con el mismo nombre, GCP lo sobreescribe
  async uploadFile(params: UploadFile_FileCloudRepository): Promise<void> {
    let fileStream: Readable
    if (params.file instanceof Buffer) {
      fileStream = Readable.from(params.file)
    } else {
      fileStream = params.file
    }
    return new Promise((resolve, reject) => {
      fileStream
        .pipe(
          fs.createWriteStream(
            path.join(__dirname, `./files/${params.fileName}`)
          )
        )
        .on("finish", () => {
          resolve()
        })
        // TODO: No hemos probado este caso de error
        .on("error", (err) => {
          console.log(err)
          reject(new Error("Error uploading file to local storage"))
        })
    })
  }
}
