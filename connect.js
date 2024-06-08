const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./sqlite.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            publicationDate DATE NOT NULL,
            description TEXT NOT NULL,
            context TEXT NOT NULL,
            source TEXT NOT NULL,
            relevance TEXT NOT NULL,
            youtubeLink TEXT NOT NULL
        );`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created news table");
    }
  );
});