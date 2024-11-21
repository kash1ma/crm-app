const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const DB_FILE = "./database.sqlite";

(async function seedDatabase() {
  const db = await open({
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

  const seedData = [
    {
      name: "John",
      surname: "Doe",
      lastName: "Smith",
      contacts: JSON.stringify([
        { type: "email", value: "john.doe@example.com" },
        { type: "phone", value: "+123456789" },
      ]),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Jane",
      surname: "Roe",
      lastName: "",
      contacts: JSON.stringify([
        { type: "email", value: "jane.roe@example.com" },
      ]),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  for (const client of seedData) {
    await db.run(
      `INSERT INTO clients (name, surname, lastName, contacts, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        client.name,
        client.surname,
        client.lastName,
        client.contacts,
        client.createdAt,
        client.updatedAt,
      ]
    );
  }

  console.log("Database seeded successfully!");
  await db.close();
})();
