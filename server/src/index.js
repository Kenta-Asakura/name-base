import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import postgres from "postgres";
import dotenv from 'dotenv';
// import { cors } from 'hono/cors';

// Load environment variables
dotenv.config();

// * TEST ENV
// const result = dotenv.config();
// console.log(
//   "ENV loaded:", result,
//   "DB_USER:", process.env.DB_USER
// );

// * TEST connection
const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = new Hono();

app.get("/", async (c) => {
  const result = await sql`SELECT 1 + 1`;
  console.log(result);
  return c.text("Hello!");
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
