import request from "supertest"

import app from "../../../../src/infrastructure/driving-adapters/rest-api/startTestApp"

describe("Root", () => {
  test("First Endpoint", async () => {
    const res = await request(app).get("/")
    expect(res.body).toEqual({
      message: "REST API Google Drive Clone. Created by Leandro Marcelo",
    })
  })
})
