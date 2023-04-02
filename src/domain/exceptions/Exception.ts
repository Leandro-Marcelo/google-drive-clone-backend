// Podríamos hacerla una abstrac class
export class Exception extends Error {
  constructor (
    public message: string,
    public spanishMessage: string,
    public statusCode: number
  ) {
    super(message)
  }
}

/* export class Exception extends Error {
  spanishMessage: string = ''
  constructor (message?: string) {
    super(message)
  }
} */

/* export class Exception extends Error {
  spanishMessage: string

  constructor (message: string) {
    super(message)
    this.spanishMessage = message
  }
} */
