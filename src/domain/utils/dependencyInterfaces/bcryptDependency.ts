export interface IBcryptDependency {
  genSalt(rounds: number): Promise<string>
  hash(data: string, salt: string): Promise<string>
  compareHash(data: string, encrypted: string): Promise<boolean>
}
// hasherAndHashComparator
