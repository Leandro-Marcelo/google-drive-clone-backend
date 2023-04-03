// * IMPORTS
import request from "supertest"

// * APP
import app from "../../../../../src/infrastructure/driving-adapters/rest-api/startTestApp"

// * TYPES AND INTERFACES
import { User } from "../../../../../src/domain/entities/user"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../../src/infrastructure/implementations/mysql/MySQLUserRepository"
import {
  CurrentUser,
  PublicUser,
} from "../../../../../src/domain/utils/interfaces"

const mySQLUserRepository = new MySQLUserRepository()

// validate that it is an array and that the array of objects is of type User is already done by typescript
describe("Users", () => {
  test("Endpoint: Get All Users - status 200 - should not return password", async () => {
    const res = await request(app).get("/api/users")
    expect(res.statusCode).toEqual(200)
    res.body.forEach((user: User) => {
      expect(user.password).toBeUndefined()
    })
  })

  let createdUser: PublicUser = {
    id: "",
    active: true,
    name: "",
    email: "",
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it("Endpoint: Create User - status 201 - should not return password", async () => {
    const res = await request(app).post("/api/users").send({
      name: "name-test",
      email: "email-test@gmail.com",
      password: "password-test",
      profilePicture: null,
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body.password).toBeUndefined()
    createdUser = { ...createdUser, ...res.body }
  })

  test("Endpoint: Get User By Unique Property - status 200 - should not return password", async () => {
    const foundUserById = await request(app).get(
      `/api/users/unique?id=${createdUser.id}`
    )
    const foundUserByEmail = await request(app).get(
      `/api/users/unique?email=${createdUser.email}`
    )
    expect(foundUserById.statusCode).toEqual(200)
    expect(foundUserByEmail.statusCode).toEqual(200)
    expect(foundUserById.body.password).toBeUndefined()
    expect(foundUserByEmail.body.password).toBeUndefined()
  })

  test("MySQLUserRepository-method-updateUserById updates password field in the user record", async () => {
    const updatedUser = await mySQLUserRepository.updateUserById(
      createdUser.id,
      {
        name: createdUser.name,
        email: createdUser.email,
        password: "password-test-mysqluserrepository-updateuserbyid",
        profilePicture: createdUser.profilePicture,
      }
    )

    expect(updatedUser.password).toEqual(
      "password-test-mysqluserrepository-updateuserbyid"
    )
  })

  it("Endpoint: Update User By Id - status 200 - should update user by id", async () => {
    const res = await request(app).put(`/api/users/${createdUser.id}`).send({
      name: "name-test-endpoint-updateuserbyid",
      email: "email-test-endpoint-updateuserbyid@gmail.com",
      password: null,
      profilePicture: createdUser.profilePicture,
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual("name-test-endpoint-updateuserbyid")
    expect(res.body.email).toEqual(
      "email-test-endpoint-updateuserbyid@gmail.com"
    )
  })

  it("Endpoint: Delete User By Id - status 200", async () => {
    const res = await request(app).delete(`/api/users/${createdUser.id}`)
    expect(res.statusCode).toEqual(200)
  })

  test("Endpoint: Get User By Unique Property - status 404 - should return user not found", async () => {
    const foundUserById = await request(app)
      .get(`/api/users/unique?id=${createdUser.id}
    `)
    const foundUserByEmail = await request(app)
      .get(`/api/users/unique?email=${createdUser.email}
    `)

    expect(foundUserById.statusCode).toEqual(404)
    expect(foundUserByEmail.statusCode).toEqual(404)
    expect(foundUserById.body.message).toEqual("user not found")
    expect(foundUserByEmail.body.message).toEqual("user not found")
  })
})
