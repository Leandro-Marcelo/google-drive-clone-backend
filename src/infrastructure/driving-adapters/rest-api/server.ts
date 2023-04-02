// * DEPENDENCIES
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import * as http from "http"

import routes from "./routes"

export class Server {
  private readonly _port: string
  public readonly _app: express.Express
  private _httpServer?: http.Server

  constructor(port: string) {
    this._port = port
    this._app = express()
    this._app.use(
      cors({
        origin: ["http://127.0.0.1:3000"],
        credentials: true,
      })
    )
    this._app.use(express.json())
    // this._app.use(express.urlencoded({ extended: false }))
    this._app.use(cookieParser())
    this._app.get("/", (req, res) => {
      res.json({
        message: "REST API Google Drive Clone. Created by Leandro Marcelo",
      })
    })
    this._app.get("/health", (req, res) => {
      res.status(200).send("OK")
    })
    this._app.use(routes)
  }

  async listen(): Promise<void> {
    return await new Promise((resolve) => {
      this._httpServer = this._app.listen(this._port, () => {
        console.log(`http://localhost:${this._port}`)
        resolve()
      })
    })
  }

  async stop(): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this._httpServer != null) {
        this._httpServer.close((error) => {
          if (error != null) {
            return reject(error)
          }
          return resolve()
        })
      }
      return resolve()
    })
  }
}
