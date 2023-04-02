export interface IJWTDependency {
  sign: (
    payload: object,
    secretOrPrivateKey: string,
    // TODO: Change this to a more specific type
    expiresIn: string
  ) => string
}
