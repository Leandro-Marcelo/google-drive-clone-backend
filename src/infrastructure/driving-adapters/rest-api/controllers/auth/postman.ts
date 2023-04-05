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
    if (req.query.userId === "1") {
      res.cookie(
        SESSION_COOKIE_NAME,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczN2Q5NjJiLTgwODAtNDBjOS04YzNjLWY4YjczY2Q0MjVjNCIsImFjdGl2ZSI6dHJ1ZSwibmFtZSI6Ik5pY28gWXVjcmEiLCJlbWFpbCI6Inl1Y3JhbmljbzBAZ21haWwuY29tIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhiVldJMklESVpmc1hnQU5HVEZSek9XOWFpdy1QQ1N1R21na2s1dz1zOTYtYyIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMDVUMDI6Mzk6MTAuOTE4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMDVUMDI6Mzk6MTAuOTE4WiIsImlhdCI6MTY4MDY2MjM1MCwiZXhwIjoxNjgwNzQ4NzUwfQ.g8c_O6G_6RqlhQtQR4Hf_z-6TOrwJTmV_oCA17RPDE8",
        {
          maxAge: MAX_AGE_SESSION_COOKIE,
        }
      )
      res.status(200).json({
        id: "737d962b-8080-40c9-8c3c-f8b73cd425c4",
        active: true,
        name: "Nico Yucra",
        email: "yucranico0@gmail.com",
        profilePicture:
          "https://lh3.googleusercontent.com/a/AGNmyxbVWI2IDIZfsXgANGTFRzOW9aiw-PCSuGmgkk5w=s96-c",
        createdAt: "2023-04-05T02:39:10.918Z",
        updatedAt: "2023-04-05T02:39:10.918Z",
      })
    } else {
      res.cookie(
        SESSION_COOKIE_NAME,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0OGU0YTliLWEyMzMtNGMwMC05N2MwLTFjZmVjYTRmMmM5OCIsImFjdGl2ZSI6dHJ1ZSwibmFtZSI6InRlc3Rpbmdub21icmUgdGVzdGluZ2FwZWxsaWRvIiwiZW1haWwiOiJjb3JyZW9kZXBydWViYWh2QGdtYWlsLmNvbSIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YWZsWG5oLV9FRlE5eGFpbnJkODJpQzl4d2xNUTlURW9MTnRHUDM9czk2LWMiLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTA1VDAyOjUzOjMzLjk4NloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA0LTA1VDAyOjUzOjMzLjk4NloiLCJpYXQiOjE2ODA2NjMyMTMsImV4cCI6MTY4MDc0OTYxM30.uQwyb2f9K3WnR6rFXUsCmHVlB_FqpRP9kEOwNxnFLnE",
        {
          maxAge: MAX_AGE_SESSION_COOKIE,
        }
      )
      res.status(200).json({
        id: "e48e4a9b-a233-4c00-97c0-1cfeca4f2c98",
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
