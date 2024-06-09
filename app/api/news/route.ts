import { NextRequest } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

let db: any;

export async function GET(req: Request, res: Response) {

  if (!db) {
    db = await open({
      filename: './sqlite.db',
      driver: sqlite3.Database
    });
  }
  const allNews = await db.all('SELECT * FROM news');
  return new Response(JSON.stringify(allNews), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}

export async function POST(req: Request, res: Response) {
  if (!db) {
    db = await open({
      filename: "./sqlite.db",
      driver: sqlite3.Database,
    });
  }

  const { publicationDate, description, context, source, relevance, youtubeLink } = await req.json();

  await db.run("INSERT INTO news (publicationDate, description, context, source, relevance, youtubeLink) VALUES (?,?,?,?,?,?)", publicationDate, description, context, source, relevance, youtubeLink);

  return new Response(
    JSON.stringify(
      { 
        message: "success" ,
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}

