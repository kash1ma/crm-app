import { open } from "sqlite";
import sqlite3 from "sqlite3";

const DB_FILE = "./database/database.sqlite";

const db = await open({
  filename: DB_FILE,
  driver: sqlite3.Database,
});

await db.exec("DROP TABLE IF EXISTS clients");

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

console.log("cleared db successfully");
