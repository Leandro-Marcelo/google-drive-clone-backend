/* The goal of Clean Architecture is to keep the domain independent of the infrastructure. This means that the domain should not be affected by changes to the infrastructure and should not know anything about the infrastructure. Instead, the infrastructure should depend on the domain, and the domain should define its own interfaces and abstractions for the infrastructure to implement. */

// We can use the interface provided by Prisma as a template or, in many cases, directly copy it to create the entity in our domain.
// import { User as UserInPrisma } from "@prisma/client"
export interface User {
  id: string
  active: boolean
  name: string
  email: string
  password: string
  profilePicture: string | null
  createdAt: Date
  updatedAt: Date
}

export type UserOmitedSecurity = Omit<User, "password">
