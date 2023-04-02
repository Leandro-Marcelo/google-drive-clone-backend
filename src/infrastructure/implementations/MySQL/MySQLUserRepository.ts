import {
  FindUserConditions,
  FindUserValues,
  UserCreateInput,
  UserCreateInputDB,
} from "../../../domain/utils/interfaces"
import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"
import { PrismaDBClient } from "../../driven-adapters/prisma"

export class MySQLUserRepository implements UserRepository {
  private readonly _prismaClient = PrismaDBClient.getInstance()

  async getAllUsers(): Promise<Omit<User, "password">[]> {
    const users: Omit<User, "password">[] =
      await this._prismaClient.user.findMany({
        select: {
          id: true,
          active: true,
          name: true,
          email: true,
          password: false,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    return users
  }

  async createUser(user: UserCreateInputDB): Promise<Omit<User, "password">> {
    return await this._prismaClient.user.create({
      data: user,
      select: {
        id: true,
        active: true,
        name: true,
        email: true,
        password: false,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async updateUserById(userId: string, user: UserCreateInput): Promise<User> {
    return await this._prismaClient.user.update({
      where: {
        id: userId,
      },
      data: user,
    })
  }

  async deleteUserById(userId: string): Promise<User> {
    return await this._prismaClient.user.delete({
      where: {
        id: userId,
      },
    })
  }

  async getUser(
    condition: FindUserConditions,
    conditionValue: FindUserValues
  ): Promise<User | null> {
    const foundUser = await this._prismaClient.user.findFirst({
      where: {
        [condition]: conditionValue,
      },
    })
    return foundUser
  }
}
