// Podríamos hacerla una abstrac class
export class Exception extends Error {
  constructor(
    public message: string,
    public spanishMessage: string,
    public statusCode: number,
    // TODO: Hacer code un enum, requerido así como lo hace prisma P2022 P2025, etc.
    public code?: string
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
