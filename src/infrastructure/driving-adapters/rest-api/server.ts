// * DEPENDENCIES
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import * as http from "http"
import passport from "passport"
import session from "express-session"

// * ROUTES
import routes from "./routes"

// * PASSPORT STRATEGIES
import { useGoogleStrategy } from "./middlewares/authProvider"
import { JWT_SECRET } from "../../../domain/configs"
import { logger } from "./middlewares/logger"

export class Server {
  private readonly _port: string
  public readonly _app: express.Express
  private _httpServer?: http.Server

  constructor(port: string) {
    this._port = port
    this._app = express()
    this._app.use(
      cors({
        origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
        credentials: true,
      })
    )
    this._app.use(express.json())
    // this._app.use(express.urlencoded({ extended: false }))
    this._app.use(cookieParser())
    /* this._app.use(logger) */
    // * AUTH PROVIDERS
    this._app.use(
      session({
        secret: JWT_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    )
    this._app.use(passport.initialize())
    passport.use("google", useGoogleStrategy())

    // * ./ AUTH PROVIDERS
    this._app.get("/", (req, res) => {
      res.send(`<h1
        style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh; margin: 0; padding: 0; font-size: 1rem;">
        API Google Drive Clone. Created by Leandro Marcelo</h1>`)
    })
    this._app.get("/health", (req, res) => {
      res.status(200).send("ok")
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
