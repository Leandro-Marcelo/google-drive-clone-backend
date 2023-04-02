import { Exception } from './Exception'

export class MissingFieldInParamsException extends Exception {
  constructor () {
    super('Missing field in params', 'Faltan campos que son obligatorios en el body', 422)
  }
}
