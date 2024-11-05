const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./medicines.db');

// Create Medicines table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS medicines (
        id TEXT PRIMARY KEY,
        commercialName TEXT NOT NULL,
        medicalName TEXT NOT NULL,
        dosage TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        sideEffects TEXT NOT NULL,
        precautions TEXT NOT NULL,
        interactions TEXT NOT NULL
    )`);

    // Create Articles table
    db.run(`CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        articleLink TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    )`);
});

module.exports = db;
