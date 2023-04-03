import { Request, Response, NextFunction } from "express"
import {
  EXPIRES_IN_JWT,
  MAX_AGE_SESSION_COOKIE,
  SESSION_COOKIE_NAME,
} from "../../../../../domain/configs"

export const postman = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie(
      SESSION_COOKIE_NAME,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlNDM1YTNkLTk1YTEtNDFmYy1hMzVjLWQzYzAyMmI5M2FhZCIsImFjdGl2ZSI6dHJ1ZSwibmFtZSI6Ik5pY28gWXVjcmEiLCJlbWFpbCI6Inl1Y3JhbmljbzBAZ21haWwuY29tIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhiVldJMklESVpmc1hnQU5HVEZSek9XOWFpdy1QQ1N1R21na2s1dz1zOTYtYyIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMDNUMDE6NTU6NTYuNzU1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMDNUMDE6NTU6NTYuNzU1WiIsImlhdCI6MTY4MDQ4Njk1NiwiZXhwIjoxNjgwNTczMzU2fQ.Sb69_-MU5emr8SXiEaEz7nh70rJnyMsRw6Q2y1N2etw",
      {
        maxAge: MAX_AGE_SESSION_COOKIE,
      }
    )
    res.status(200).json({
      currentUser: {
        id: "2e435a3d-95a1-41fc-a35c-d3c022b93aad",
        active: true,
        name: "Nico Yucra",
        email: "yucranico0@gmail.com",
        profilePicture:
          "https://lh3.googleusercontent.com/a/AGNmyxbVWI2IDIZfsXgANGTFRzOW9aiw-PCSuGmgkk5w=s96-c",
        createdAt: "2023-04-03T01:55:56.755Z",
        updatedAt: "2023-04-03T01:55:56.755Z",
      },
      authJwt:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlNDM1YTNkLTk1YTEtNDFmYy1hMzVjLWQzYzAyMmI5M2FhZCIsImFjdGl2ZSI6dHJ1ZSwibmFtZSI6Ik5pY28gWXVjcmEiLCJlbWFpbCI6Inl1Y3JhbmljbzBAZ21haWwuY29tIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhiVldJMklESVpmc1hnQU5HVEZSek9XOWFpdy1QQ1N1R21na2s1dz1zOTYtYyIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMDNUMDE6NTU6NTYuNzU1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMDNUMDE6NTU6NTYuNzU1WiIsImlhdCI6MTY4MDQ4Njk1NiwiZXhwIjoxNjgwNTczMzU2fQ.Sb69_-MU5emr8SXiEaEz7nh70rJnyMsRw6Q2y1N2etw",
    })
    return
  } catch (err) {
    return next(err)
  }
}
