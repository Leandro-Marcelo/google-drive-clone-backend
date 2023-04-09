import { Exception } from "./Exception"

export class UploadFileToCloudException extends Exception {
  constructor() {
    super(
      `Failed to upload file to cloud`,
      "Fallo el subir el archivo a cloud",
      500,
      "UploadFileToCloudException"
    )
  }
}
