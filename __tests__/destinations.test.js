const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET: /api", () => {
  test("200: Serves up a list of available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toHaveProperty("GET '/api'");
        expect(body.endpoints).toHaveProperty("GET '/api/destinations'");
      });
  });
});

describe("GET: /api/destinations", () => {
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
  describe("GET destinations queries", () => {
    test("200: can set a custom limit", () => {
      return request(app)
        .get("/api/destinations?limit=5")
        .expect(200)
        .then(({ body }) => {
          expect(body.destinations.length).toBe(5);
        });
    });
    test("200: responds with destinations below queried points amount in economy(op)", () => {
      return request(app)
        .get("/api/destinations?points_balance=23457")
        .expect(200)
        .then(({ body }) => {
          body.destinations.forEach((destination) => {
            expect(destination.economy_op).toBeLessThanOrEqual(23457);
          });
        });
    });
    test("200: can be queried by travel class", () => {
      return request(app)
        .get("/api/destinations?travel_class=p_economy")
        .expect(200)
        .then(({ body }) => {
          body.destinations.forEach((destination) => {
            console.log(destination);
            expect(destination.p_economy_op).not.toBe(null);
          });
        });
    });
    test("200: can be queried by travel class and points available", () => {
      return request(app)
        .get("/api/destinations?travel_class=business&points_balance=78000")
        .expect(200)
        .then(({ body }) => {
          body.destinations.forEach((destination) => {
            expect(destination.business_op).toBeLessThanOrEqual(78000);
          });
        });
    });
    test("404: errors when invalid travel class queried", () => {
      return request(app)
        .get("/api/destinations?travel_class=apple")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid travel class");
        });
    });
    test("404: errors when non-numeric given for limit", () => {
      return request(app)
        .get("/api/destinations?limit=cake")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("limit must be a number");
        });
    });
    test("200: pagination works as expected", () => {
      return request(app)
        .get("/api/destinations?page=2")
        .expect(200)
        .then(({ body }) => {
          expect(body.destinations[0].city).toBe("Beijing");
        });
    });
  });
});
