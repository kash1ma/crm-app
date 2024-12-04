const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const { app } = require("../server.js");

let db;

beforeAll(async () => {
  // Use an in-memory SQLite database
  db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      lastName TEXT,
      contacts TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  app.locals.db = db; // Attach the test database to the app
});

afterAll(async () => {
  await db.close();
});

describe("Clients API", () => {
  test("GET /api/clients - should return an empty list initially", async () => {
    const res = await request(app).get("/api/clients");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /api/clients - should create a new client", async () => {
    const clientData = {
      name: "John",
      surname: "Doe",
      lastName: "Smith",
      contacts: [
        { type: "phone", value: "123456789" },
        { type: "email", value: "john@example.com" },
      ],
    };

    const res = await request(app).post("/api/clients").send(clientData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      name: "John",
      surname: "Doe",
      lastName: "Smith",
      contacts: clientData.contacts,
    });
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });

  test("GET /api/clients/:id - should return a specific client", async () => {
    const res = await request(app).get("/api/clients/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("John");
    expect(res.body.contacts).toEqual([
      { type: "phone", value: "123456789" },
      { type: "email", value: "john@example.com" },
    ]);
  });

  test("PATCH /api/clients/:id - should update a client", async () => {
    const updateData = {
      name: "Jane",
      contacts: [{ type: "email", value: "jane@example.com" }],
    };

    const res = await request(app).patch("/api/clients/1").send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Jane");
    expect(res.body.contacts).toEqual(updateData.contacts);
  });

  test("DELETE /api/clients/:id - should delete a client", async () => {
    const res = await request(app).delete("/api/clients/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({});

    // Ensure the client no longer exists
    const checkRes = await request(app).get("/api/clients/1");
    expect(checkRes.statusCode).toBe(404);
  });

  test("POST /api/clients - should return validation errors", async () => {
    const invalidData = { surname: "Doe" };
    const res = await request(app).post("/api/clients").send(invalidData);
    expect(res.statusCode).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([{ field: "name", message: "Не указано имя" }])
    );
  });

  test("GET /api/clients/:id - should return 404 for non-existent client", async () => {
    const res = await request(app).get("/api/clients/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Client Not Found" });
  });
});
