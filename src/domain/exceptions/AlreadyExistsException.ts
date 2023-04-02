import { Exception } from "./Exception"

export class AlreadyExistsException extends Exception {
  constructor(complementMsg: string) {
    super(`${complementMsg} already exists`, "ya existe", 400)
  }
}
