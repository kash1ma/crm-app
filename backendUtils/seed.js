const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const { faker } = require("@faker-js/faker");

const DB_FILE = "./database/database.sqlite";

function createRandomUser() {
  return {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    contacts: JSON.stringify([
      { type: "email", email: faker.internet.email() },
      { type: "phone", value: faker.phone.number() },
    ]),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

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

  const seedData = faker.helpers.multiple(createRandomUser, {
    count: 10,
  });

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
