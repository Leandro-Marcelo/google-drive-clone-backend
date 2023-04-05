import { Storage } from "@google-cloud/storage"
import { GCP_CLOUD_STORAGE_JSON_CREDENTIALS_NAME } from "../../../../domain/configs"

// Singleton
export class CloudStorage {
  private static _INSTANCE: Storage

  // Type StorageOptions viene de @google-cloud/storage
  static getInstance(): Storage {
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new Storage({
        // takes it from the root of the project
        keyFilename: GCP_CLOUD_STORAGE_JSON_CREDENTIALS_NAME,
      })
    }

    return this._INSTANCE
  }
}
