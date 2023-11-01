const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET: Destinations", () => {
  test("200: responds with an array of correctly shaped objects", () => {
    return request(app)
      .get("/api/destinations")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.destinations)).toBe(true);
        body.destinations.forEach((destination) => {
          expect(destination).toHaveProperty("city");
          expect(destination).toHaveProperty("country");
          expect(destination).toHaveProperty("economy_op");
          expect(destination).toHaveProperty("economy_p");
          expect(destination).toHaveProperty("p_economy_op");
          expect(destination).toHaveProperty("p_economy_p");
          expect(destination).toHaveProperty("business_op");
          expect(destination).toHaveProperty("business_p");
        });
      });
  });
  test("200: response length limited to 20 by default", () => {
    return request(app)
      .get("/api/destinations")
      .expect(200)
      .then(({ body }) => {
        expect(body.destinations.length).toBe(20);
      });
  });
});
