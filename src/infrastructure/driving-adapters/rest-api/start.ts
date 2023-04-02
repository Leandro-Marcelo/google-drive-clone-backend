import * as dotenv from "dotenv"
import { App } from "./App"

try {
  dotenv.config({
    // path: path.resolve(__dirname, '../../../../.env')
    path: ".env.dev",
  })

  new App().start()
} catch (err) {
  console.log(err)
}
