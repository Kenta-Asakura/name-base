import postgres from "postgres";
import dotenv from 'dotenv';

// Load environment variables based on NODE_ENV
const envFile = process.env.RUN_ENV === 'docker'
  ? '.env.docker'
  : '.env.development';

// dotenv.config();
dotenv.config({ path: new URL(`../../${envFile}`, import.meta.url) });

// ! Debug - show environment variables
// console.log('Environment:', {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME
// });

// PostgreSQL connection
const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  debug: true, // This will log all queries to console
});

export const nameModel = {
  // ! TEST
  async testConnection() {
    try {
      const result = await sql`SELECT NOW() as current_time`;
      console.log('Database connection successful:', result[0].current_time);
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  },

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

  async findById(id) {
    try {
      const result = await sql`
        SELECT * FROM names
        WHERE id = ${id}
      `;
      return result[0] || null;
    } catch (error) {
      console.error('Error in findById', error);
      throw error;
    }
  },

  async create(firstName, lastName) {
    try {
      const result = await sql`
        INSERT INTO names (first_name, last_name)
        VALUES (${firstName}, ${lastName})
      `;
      return result [0];
    } catch (error) {
      console.error('Error in create', error);
      throw error;
    }
  },

  // update
  async update(id, firstName, lastName) {
    try {
      const recordExists = await this.findById(id);
      if (!recordExists) {
        return null;
      }

      const result = await sql`
        UPDATE names
        SET first_name = ${firstName}, last_name = ${lastName}
        WHERE id = ${id}
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error in update', error);
      throw error;
    }
  },

  // delete
  async delete(id) {
    try {
      const recordExists = await this.findById(id);
      if (!recordExists) {
        return null;
      }

      const result = await sql`
        DELETE FROM names
        WHERE id = ${id}
      `;
      return { success: true, message: 'Record deleted successfully' };
    } catch (error) {
      console.error('Error in delete', error);
      throw error;
    }
  }
};
