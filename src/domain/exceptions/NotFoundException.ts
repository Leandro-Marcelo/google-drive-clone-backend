import { Exception } from "./Exception"

export class NotFoundException extends Exception {
  constructor(complementMsg: string) {
    super(`${complementMsg} not found`, "No encontrado", 404)
  }
}
