import postgres from "postgres";
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection
const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const nameModel = {
  async findAll() {
    try {
      const names = await sql`
        SELECT * FROM names
        ORDER BY created_at DESC
      `;
      return names;
    } catch (error) {
      console.error('Error in findAll', error);
      throw error;
    }
  }
};
