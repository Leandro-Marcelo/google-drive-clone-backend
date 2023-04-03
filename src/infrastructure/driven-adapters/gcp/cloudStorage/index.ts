import { Storage } from "@google-cloud/storage"

// Singleton
export class CloudStorage {
  private static _INSTANCE: Storage

  // Type StorageOptions viene de @google-cloud/storage
  static getInstance(): Storage {
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new Storage({
        // takes it from the root of the project
        keyFilename: "credentials-gcloud.json",
      })
    }

    return this._INSTANCE
  }
}
