// /server/src/routes/testRoutes.js
import { Hono } from "hono";
import { nameModel } from "../models/nameModel.js";

const testRouter = new Hono();

// Test route for database connection and query
testRouter.get('/', async (c) => {
  try {
    // Test the database connection
    const connected = await nameModel.testConnection();

    if (!connected) {
      return c.json({
        success: false,
        message: "Database connection failed"
      }, 500);
    }

    // Use the findAll method from your nameModel
    const names = await nameModel.findAll();

    // Return the result as JSON
    return c.json({
      success: true,
      count: names.length,
      names: names
    });
  } catch (error) {
    console.error('Database error:', error);
    return c.json({
      success: false,
      message: error.message
    }, 500);
  }
});

export default testRouter;
