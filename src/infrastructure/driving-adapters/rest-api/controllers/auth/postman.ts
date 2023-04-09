import { JWTDependency } from "./../../../../utils/jwtDependency"
import { Request, Response, NextFunction } from "express"
import {
  EXPIRES_IN_JWT,
  JWT_SECRET,
  MAX_AGE_SESSION_COOKIE,
  SESSION_COOKIE_NAME,
} from "../../../../../domain/configs"

export const postman = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jwtDependency = new JWTDependency()
    if (req.query.userId === "1") {
      const authJwt = jwtDependency.sign(
        {
          id: "6ad62e8e-0eb4-4ca4-b443-cd267349628a",
          active: true,
          name: "Nico Yucra",
          email: "yucranico0@gmail.com",
          profilePicture:
            "https://lh3.googleusercontent.com/a/AGNmyxbVWI2IDIZfsXgANGTFRzOW9aiw-PCSuGmgkk5w=s96-c",
          createdAt: "2023-04-05T02:39:10.918Z",
          updatedAt: "2023-04-05T02:39:10.918Z",
        },
        JWT_SECRET,
        "1d"
      )

      res.cookie(SESSION_COOKIE_NAME, authJwt, {
        maxAge: MAX_AGE_SESSION_COOKIE,
      })
      res.status(200).json({
        id: "6ad62e8e-0eb4-4ca4-b443-cd267349628a",
        active: true,
        name: "Nico Yucra",
        email: "yucranico0@gmail.com",
        profilePicture:
          "https://lh3.googleusercontent.com/a/AGNmyxbVWI2IDIZfsXgANGTFRzOW9aiw-PCSuGmgkk5w=s96-c",
        createdAt: "2023-04-05T02:39:10.918Z",
        updatedAt: "2023-04-05T02:39:10.918Z",
      })
    } else {
      const authJwt = jwtDependency.sign(
        {
          id: "4073e039-7a06-4bd0-b54b-b22945a19fb3",
          active: true,
          name: "testingnombre testingapellido",
          email: "correodepruebahv@gmail.com",
          profilePicture:
            "https://lh3.googleusercontent.com/a/AGNmyxaflXnh-_EFQ9xainrd82iC9xwlMQ9TEoLNtGP3=s96-c",
          createdAt: "2023-04-05T02:53:33.986Z",
          updatedAt: "2023-04-05T02:53:33.986Z",
        },
        JWT_SECRET,
        "1d"
      )

      res.cookie(SESSION_COOKIE_NAME, authJwt, {
        maxAge: MAX_AGE_SESSION_COOKIE,
      })
      res.status(200).json({
        id: "4073e039-7a06-4bd0-b54b-b22945a19fb3",
        active: true,
        name: "testingnombre testingapellido",
        email: "correodepruebahv@gmail.com",
        profilePicture:
          "https://lh3.googleusercontent.com/a/AGNmyxaflXnh-_EFQ9xainrd82iC9xwlMQ9TEoLNtGP3=s96-c",
        createdAt: "2023-04-05T02:53:33.986Z",
        updatedAt: "2023-04-05T02:53:33.986Z",
      })
    }

    return
  } catch (err) {
    return next(err)
  }
}
