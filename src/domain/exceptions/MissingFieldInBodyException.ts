import { Exception } from './Exception'

export class MissingFieldInBodyException extends Exception {
  constructor () {
    super('Missing field in body', 'Faltan campos que son obligatorios en el body', 400)
  }
}
