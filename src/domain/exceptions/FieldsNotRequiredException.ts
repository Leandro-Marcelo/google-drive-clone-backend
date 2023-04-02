import { Exception } from './Exception'

export class FieldsNotRequiredInBodyException extends Exception {
  constructor () {
    super('Fields not required in body', 'Campos no requeridos en el body', 400)
  }
}
