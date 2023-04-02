import * as dotenv from "dotenv"
import { App } from "./app"

try {
  dotenv.config({
    // path: path.resolve(__dirname, '../../../../.env')
    path: ".env.dev",
  })

  new App().start()
} catch (err) {
  console.log(err)
}
