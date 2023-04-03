import { EXPIRES_IN_JWT, JWT_SECRET } from "../../../domain/configs"
import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"
import { IBcryptDependency } from "../../../domain/utils/dependencyInterfaces/bcryptDependency"
import { IJWTDependency } from "../../../domain/utils/dependencyInterfaces/jwtDependency"
import { IUuidGenerator } from "../../../domain/utils/dependencyInterfaces/uuidGenerator"
import {
  AuthenticatedUser,
  CurrentUser,
  ProviderUserData,
  UserCreateInputDB,
} from "../../../domain/utils/interfaces"

export class LoginSignUpGoogleUseCase {
  private readonly _userRepository: UserRepository
  private readonly _uuidGenerator: IUuidGenerator
  private readonly _bcryptDependency: IBcryptDependency
  private readonly _jwtDependency: IJWTDependency

  constructor(
    userRepository: UserRepository,
    uuidGenerator: IUuidGenerator,
    jwtDependency: IJWTDependency,
    bcryptDependency: IBcryptDependency
  ) {
    this._userRepository = userRepository
    this._uuidGenerator = uuidGenerator
    this._jwtDependency = jwtDependency
    this._bcryptDependency = bcryptDependency
  }

  async run(params: ProviderUserData): Promise<AuthenticatedUser> {
    const foundUser = await this._userRepository.getUser("email", params.email)

    if (foundUser === null) {
      const newUserId = this._uuidGenerator.generate()
      const newUserPassword = `${params.provider}${params.providerId}`
      const salt = await this._bcryptDependency.genSalt(10)
      const hashedPassword = await this._bcryptDependency.hash(
        newUserPassword,
        salt
      )

      const newUser: UserCreateInputDB = {
        id: newUserId,
        name: params.name,
        email: params.email,
        password: hashedPassword,
        profilePicture: params.profilePicture,
      }
      const currentUser = await this._userRepository.createUser(newUser)
      const authJwt = this._jwtDependency.sign(
        currentUser,
        JWT_SECRET,
        EXPIRES_IN_JWT
      )

      return {
        authJwt,
        currentUser,
      }
    } else {
      const { password, ...user } = foundUser
      const currentUser: CurrentUser = user
      const authJwt = this._jwtDependency.sign(currentUser, JWT_SECRET, "1d")

      return {
        authJwt,
        currentUser,
      }
    }
  }
}
