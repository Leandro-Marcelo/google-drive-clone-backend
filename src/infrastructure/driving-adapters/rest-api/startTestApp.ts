import { Server } from "./server"

const port: string = process.env.PORT ?? "4000"
const server = new Server(port)
export default server._app
