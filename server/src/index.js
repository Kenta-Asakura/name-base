import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

import nameRouter from './routes/nameRoutes.js';
import testRouter from './routes/testRoutes.js';

// Load environment variables
dotenv.config();

const app = new Hono();

// Middleware
app.use('*', cors());

// Health check route
app.get('/', (c) => c.json({ status: 'Server is running' }));

// Routes
app.route('/names', nameRouter);

// ! - TEST postgreSQL query
app.route('/api/test', testRouter);

// * Debug - show environment variables
// app.get('/debug/env', (c) => {
//   return c.json({
//     dbHost: process.env.DB_HOST || 'not set',
//     dbPort: process.env.DB_PORT || 'not set',
//     dbUser: process.env.DB_USER || 'not set',
//     dbName: process.env.DB_NAME || 'not set',
//   });
// });

// Start server
const port = process.env.PORT || 3001;
console.log(`Using port: ${port}`); // ! Add this for debugging

// Serve app
serve({
  fetch: app.fetch,
  port: port,
}, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
