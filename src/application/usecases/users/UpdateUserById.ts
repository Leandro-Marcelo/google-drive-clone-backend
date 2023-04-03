import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import {
  UpdateUserByIdParams,
  UserCreateInput,
} from "../../../domain/utils/interfaces"
import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"

export class UpdateUserByIdUseCase {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(params: UpdateUserByIdParams): Promise<Omit<User, "password">> {
    const foundUser = await this._userRepository.getUser("id", params.userId)

    if (foundUser === null) {
      throw new NotFoundException("user")
    }

    const userCreateInput: UserCreateInput = {
      ...params.data,
      password:
        params.data.password === null
          ? foundUser.password
          : params.data.password,
    }

    return await this._userRepository.updateUserById(
      params.userId,
      userCreateInput
    )
  }
}
