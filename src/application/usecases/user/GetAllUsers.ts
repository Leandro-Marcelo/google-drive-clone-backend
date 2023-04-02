import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"

export class GetAllUsersUseCase {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(): Promise<Omit<User, "password">[]> {
    const users = await this._userRepository.getAllUsers()
    return users
  }
}
