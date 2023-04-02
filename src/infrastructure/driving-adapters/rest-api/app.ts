import { REST_API_PORT } from "../../../domain/configs"
import { Server } from "./Server"

export class App {
  server?: Server

  async start(): Promise<void> {
    const port = REST_API_PORT
    this.server = new Server(port)
    return await this.server.listen()
  }

  async stop(): Promise<void> {
    return await this.server?.stop()
  }
}
