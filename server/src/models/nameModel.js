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
  // ! TEST
  // async testConnection() {
  //   try {
  //     const result = await sql`SELECT NOW() as current_time`;
  //     console.log('Database connection successful:', result[0].current_time);
  //     return true;
  //   } catch (error) {
  //     console.error('Database connection failed:', error);
  //     return false;
  //   }
  // }

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
  },

  async create(firstName, lastName) {
    try {
      const result = await sql`
        INSERT INTO names (first_name, last_name)
        VALUES (${firstName}, ${lastName})
        RETURNING *
      `;
      return result [0]; // *
    } catch (error) {
      console.error('Error in create', error);
      throw error;
    }
  }
};
