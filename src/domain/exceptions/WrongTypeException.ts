import { Exception } from './Exception'

export class WrongTypeException extends Exception {
  constructor () {
    super('Wrong types', 'Tipos erroneos', 400)
  }
}
