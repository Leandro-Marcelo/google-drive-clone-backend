export interface IHasher {
  genSalt(rounds: number): Promise<string>
  hash(data: string, salt: string): Promise<string>
}

export interface IHashComparator {
  compareHash(data: string, encrypted: string): Promise<boolean>
}
