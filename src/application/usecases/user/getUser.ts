import { User } from "../../../domain/entities/User"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { GetUserParams } from "../../../domain/utils/interfaces"

export class GetUser {
  private readonly _userRespository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
  }

  async run(params: GetUserParams): Promise<Omit<User, "password">> {
    const foundUser = await this._userRespository.getUser(
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
