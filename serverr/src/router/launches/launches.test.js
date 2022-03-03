const request = require("supertest");
const app = require("../../app");

describe("Test Get /launches", () => {
  test("It Should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("test Paots/ launch", () => {
      const launchData = {   
          mission: "uss",
          rocket: "rocket",
          target: "not here",
        launchDate: "January 24, 2032",
      };
      const launchDataWithoutDate = {
        mission: "uss",
        rocket: "rocket",
        target: "not here",
      };
      const launchDataInvalidDate = {
        mission: "uss",
        rocket: "rocket",
        target: "not here",
        launchDate: "Jan 1st"
      };
  test("should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchData)
      .expect("Content-Type", /json/)
      .expect(201);

      const requestDate = new Date(launchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate)

      expect(response.body).toMatchObject(launchDataWithoutDate)
  });

  test("should test for missing required properties success", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

        expect(response.body).toEqual({
          error: "Missing required launch property",
        });
  });

  test("should test for invalid date", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

         expect(response.body).toEqual({
         "error": "Invalid launch Date",
         }); 
  });
});
