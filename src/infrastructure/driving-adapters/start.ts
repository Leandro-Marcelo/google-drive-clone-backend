/* import path from 'path'
import * as dotenv from 'dotenv' */
import { App as RestApiApp } from "./rest-api/app"

try {
  /* dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
  }) */
  console.log("Starting apps...")
  new RestApiApp().start()
} catch (err) {
  console.log(err)
}
