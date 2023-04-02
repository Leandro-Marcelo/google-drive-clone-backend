import { User } from "../../../domain/entities/user"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { UserRepository } from "../../../domain/repositories/userRepository"
import { GetUserParams } from "../../../domain/utils/interfaces"

export class GetUserByUniqueProperty {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(params: GetUserParams): Promise<Omit<User, "password">> {
    const foundUser = await this._userRepository.getUser(
      params.condition,
      params.conditionValue
    )

    if (foundUser === null) {
      throw new NotFoundException("user")
    }

    const { password, ...user } = foundUser

    return user
  }
}
