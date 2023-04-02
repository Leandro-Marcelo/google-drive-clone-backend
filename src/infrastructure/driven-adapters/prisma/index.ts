import { PrismaClient } from "@prisma/client"

import * as dotenv from "dotenv"
dotenv.config({
  path: ".env.dev",
})

// Design pattern: Singleton
export class PrismaDBClient {
  private static _INSTANCE: PrismaClient

  static getInstance(): PrismaClient {
    if (this._INSTANCE === undefined) {
      this._INSTANCE = new PrismaClient()
    }

    return this._INSTANCE
  }
}
