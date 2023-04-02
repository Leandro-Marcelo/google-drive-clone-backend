import {
  FindUserConditions,
  FindUserValues,
  UserCreateInput,
  UserCreateInputDB,
} from "./../../../domain/utils/interfaces"
import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { PrismaDBClient } from "../../driven-adapters/prisma"

export class MySQLUserRepository implements UserRepository {
  private readonly _prismaClient = PrismaDBClient.getInstance()

  async getAllUser(): Promise<Omit<User, "password">[]> {
    const users: Omit<User, "password">[] =
      await this._prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
          updatedAt: true,
          active: true,
          profilePicture: true,
        },
      })
    return users
  }

  async createUser(user: UserCreateInputDB): Promise<Omit<User, "password">> {
    return await this._prismaClient.user.create({
      data: user,
    })
  }

  async updateUserById(
    userId: string,
    user: UserCreateInput
  ): Promise<Omit<User, "password">> {
    return await this._prismaClient.user.update({
      where: {
        id: userId,
      },
      data: user,
    })
  }

  async deleteUserById(userId: string): Promise<Omit<User, "password">> {
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
