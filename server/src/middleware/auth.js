import dotenv from 'dotenv';
import jwksClient from 'jwks-rsa';
import { jwtVerify, decodeProtectedHeader } from 'jose';
import { createPublicKey } from 'crypto';

dotenv.config();

const issuer = 'https://dev-zq1073bqh6k174ua.jp.auth0.com/';
const audience = process.env.VITE_AUTH0_AUDIENCE;

// For signing keys - jwksClient instance
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


export const jwtMiddleware = async (c, next) => {
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

    // Store user info in the context for route handlers
    c.set('user', payload);

    await next(); // Proceed to actual route handler
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return c.json({ error: 'Invalid token' }, 401);
  }
};
