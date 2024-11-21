const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

//Constants

const DB_FILE = "./database/database.sqlite";
const PORT = process.env.PORT || 3000;

//Initialization

const app = express();
app.use(bodyParser.json());

//Helpers

function asString(value) {
  return value ? String(value).trim() : "";
}

// Error class
class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

// Database setup
let db;

(async function initializeDb() {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      lastName TEXT,
      contacts TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);
})();

// Validation and Data Preparation
function makeClientFromData(data) {
  const errors = [];
  const client = {
    name: asString(data.name),
    surname: asString(data.surname),
    lastName: asString(data.lastName),
    contacts: Array.isArray(data.contacts)
      ? data.contacts.map((contact) => ({
          type: asString(contact.type),
          value: asString(contact.value),
        }))
      : [],
  };

  if (!client.name) errors.push({ field: "name", message: "Не указано имя" });
  if (!client.surname)
    errors.push({ field: "surname", message: "Не указана фамилия" });
  if (client.contacts.some((contact) => !contact.type || !contact.value)) {
    errors.push({
      field: "contacts",
      message: "Не все добавленные контакты полностью заполнены",
    });
  }

  if (errors.length) throw new ApiError(422, { errors });
  return client;
}

// Routes
app.get("/api/clients", async (req, res, next) => {
  try {
    const search = req.query.search
      ? `%${req.query.search.trim().toLowerCase()}%`
      : "%";
    const clients = await db.all(
      `SELECT * FROM clients WHERE 
        LOWER(name) LIKE ? OR 
        LOWER(surname) LIKE ? OR 
        LOWER(lastName) LIKE ?`,
      [search, search, search]
    );
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

app.post("/api/clients", async (req, res, next) => {
  try {
    const client = makeClientFromData(req.body);
    const now = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO clients (name, surname, lastName, contacts, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        client.name,
        client.surname,
        client.lastName,
        JSON.stringify(client.contacts),
        now,
        now,
      ]
    );
    res
      .status(201)
      .json({ id: result.lastID, ...client, createdAt: now, updatedAt: now });
  } catch (error) {
    next(error);
  }
});

app.get("/api/clients/:id", async (req, res, next) => {
  try {
    const client = await db.get("SELECT * FROM clients WHERE id = ?", [
      req.params.id,
    ]);
    if (!client) throw new ApiError(404, { message: "Client Not Found" });
    client.contacts = JSON.parse(client.contacts);
    res.json(client);
  } catch (error) {
    next(error);
  }
});

app.patch("/api/clients/:id", async (req, res, next) => {
  try {
    const existingClient = await db.get("SELECT * FROM clients WHERE id = ?", [
      req.params.id,
    ]);
    if (!existingClient)
      throw new ApiError(404, { message: "Client Not Found" });

    const updatedClient = makeClientFromData({
      ...existingClient,
      ...req.body,
    });
    const now = new Date().toISOString();
    await db.run(
      `UPDATE clients SET name = ?, surname = ?, lastName = ?, contacts = ?, updatedAt = ? WHERE id = ?`,
      [
        updatedClient.name,
        updatedClient.surname,
        updatedClient.lastName,
        JSON.stringify(updatedClient.contacts),
        now,
        req.params.id,
      ]
    );

    res.json({
      id: req.params.id,
      ...updatedClient,
      createdAt: existingClient.createdAt,
      updatedAt: now,
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/clients/:id", async (req, res, next) => {
  try {
    const result = await db.run("DELETE FROM clients WHERE id = ?", [
      req.params.id,
    ]);
    if (result.changes === 0)
      throw new ApiError(404, { message: "Client Not Found" });
    res.json({});
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.data);
  } else {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
