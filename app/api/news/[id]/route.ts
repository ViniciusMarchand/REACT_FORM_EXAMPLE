import { open } from "sqlite";
import sqlite3 from "sqlite3";

let db: any;
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    if (!db) {
      db = await open({
        filename: "./sqlite.db",
        driver: sqlite3.Database,
      });
    }
    const { id } = params;
    const { publicationDate, description, context, source, relevance, youtubeLink } = await req.json();
  
    await db.run("UPDATE news SET publicationDate = ?, description = ?, context = ?, source = ?, relevance = ?, youtubeLink = ? WHERE id = ?", publicationDate, description, context, source, relevance, youtubeLink, parseInt(id));
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

  export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!db) {
      db = await open({
        filename: "./sqlite.db",
        driver: sqlite3.Database,
      });
    }
    const { id } = params;
  
    const New = await db.get("SELECT * FROM news WHERE id = ?", parseInt(id));
    return new Response(JSON.stringify(New), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
  }

  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!db) {
      db = await open({
        filename: "./sqlite.db",
        driver: sqlite3.Database,
      });
    }
    const { id } = params;
  
    await db.run("DELETE FROM news WHERE id = ?", parseInt(id));
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