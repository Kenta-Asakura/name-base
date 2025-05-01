import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import {
  jwtVerify,
  decodeJwt,
  decodeProtectedHeader
} from 'jose';
import { createPublicKey } from 'crypto';

import nameRouter from './routes/nameRoutes.js';
import testRouter from './routes/testRoutes.js';

// Load environment variables
dotenv.config();

const app = new Hono();

// Middleware
app.use('*', cors());

// Express way  (old)
// const verifyJwt = jwt({
//   secret: jwksClient.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: 'https://dev-zq1073bqh6k174ua.jp.auth0.com/',
//   algorithms: ['RS256']
// });

const issuer = 'https://dev-zq1073bqh6k174ua.jp.auth0.com/';
const audience = process.env.VITE_AUTH0_AUDIENCE;

// For signing keys - jwksClient instance
const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${issuer}.well-known/jwks.json`,
});

// ! TEST
// console.log('client', client);

// Function to get the signing key
async function getSigningKey(kid) {
  const key = await client.getSigningKey(kid);
  // console.log(key); // ! TEST

  const publicKeyPem = key.getPublicKey(); // PEM string
  // console.log(publicKeyPem); // ! TEST

  const keyObject = createPublicKey(publicKeyPem); // Convert to KeyObject
  // console.log(keyObject); // ! TEST

  return keyObject;
};

// Middleware
const jwtMiddleware = async (c, next) => {
  // ! TEST
  // console.log(c.req.header);
  // console.log([...c.req.raw.headers]);

  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    console.log('Missing or invalid Authorization header');
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const header = decodeProtectedHeader(token);
    // console.log(header); // ! TEST

    const kid = header.kid;
    // console.log('kid -', kid); // ! TEST

    if (!kid) {
      console.log('No kid found in token');
      return c.json({ error: 'Invalid token header' }, 401);
    }

    const publicKey = await getSigningKey(kid);
    console.log('publicKey -', publicKey); // ! TEST

    const { payload } = await jwtVerify(token, publicKey, {
      issuer,
      audience,
    });
    console.log('JWT verified, payload:', payload);

    await next(); // Proceed to actual route handler
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return c.json({ error: 'Invalid token' }, 401);
  }
};

// ! Middlware to be implemented
app.use('/protected', jwtMiddleware);

app.get('/protected', (c) => {
  return c.json({ status: 'Access granted to protected route' });
});

// Health check route
app.get('/', (c) => c.json({ status: 'Server is running' }));

// Routes
// - Query all names
app.route('/names', nameRouter);

// ! TEST - postgreSQL query
// app.route('/api/test', testRouter);

// ! TEST - Auth0 Api route
app.get('/protected', (c) => c.json({ status: 'Hello from protected route' }));

// ! Debug - show environment variables
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
console.log(`Using port: ${port}`);

// Serve app
serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'  // This allows connections from any IP
}, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
