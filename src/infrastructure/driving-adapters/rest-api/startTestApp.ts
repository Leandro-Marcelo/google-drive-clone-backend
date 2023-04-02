import { REST_API_PORT } from "../../../domain/configs"
import { Server } from "./Server"

const port = REST_API_PORT
const server = new Server(port)
export default server._app
