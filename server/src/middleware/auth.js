import dotenv from 'dotenv';
import jwksClient from 'jwks-rsa';
import { jwtVerify, decodeProtectedHeader } from 'jose';
import { createPublicKey } from 'crypto';

dotenv.config();

// !Debug
const issuer = process.env.AUTH0_ISSUER || 'https://dev-zq1073bqh6k174ua.jp.auth0.com/';
// const audience = process.env.AUTH0_AUDIENCE || 'https://dev-zq1073bqh6k174ua.jp.auth0.com/api/v2/';
const audience = process.env.AUTH0_AUDIENCE || 'https://name-base-api';
console.log('Auth config:', { issuer, audience }); // ! Debug log

// JWKS Client Setup - to fetch public keys for verifying tokens
const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${issuer}.well-known/jwks.json`,
});
// console.log('client', client); // !Debug

// !Debug
// const token = await getAccessTokenSilently();
// console.log(token);

// Function to get the signing key
async function getSigningKey(kid) {
  const key = await client.getSigningKey(kid);
  // console.log('key', key); // !Debug
  const publicKeyPem = key.getPublicKey(); // PEM string
  // console.log('publicKeyPem', publicKeyPem); // !Debug
  const keyObject = createPublicKey(publicKeyPem); // Convert to KeyObject
  // console.log('keyObject', keyObject); // !Debug

  // console.log('keyObject', keyObject);
  return keyObject;
};

// Middleware
export const jwtMiddleware = async (c, next) => {
  // console.log([...c.req.raw.headers]); // !Debug

  // 1. Extract the token from the Authorization header
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    console.log('Missing or invalid Authorization header');
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Decode the token header to get the kid
    const header = decodeProtectedHeader(token);
    // console.log('header', header); // !Debug 
    
    // !Debug
    // const permissions = getPermissionsFromToken(token);
    // console.log('permissions', permissions);

    const kid = header.kid;
    // console.log('kid -', kid); // !Debug

    if (!kid) {
      console.log('No kid found in token');
      return c.json({ error: 'Invalid token header' }, 401);
    }

    // 3. Get the public key for verification
    const publicKey = await getSigningKey(kid);
    // console.log('publicKey -', publicKey); // !Debug

    // !TEST
    // const decoded = decodeJwt(token);
    // console.log('Decoded JWT payload:', decoded);

    // 4. Verify the token
    const { payload } = await jwtVerify(token, publicKey, {
      issuer,
      audience,
    });

    // !Debug
    // After token verification, store user permissions in context
    if (payload.permissions) {
      c.set('permissions', payload.permissions);
    }

    // !Debug
    // Inside the jwtMiddleware, after token verification:
    // console.log('=== JWT PAYLOAD ===');
    // console.log(JSON.stringify(payload, null, 2));
    // console.log('=== PERMISSIONS ===');
    // console.log(payload.permissions); 
    // console.log(payload['https://name-base-api/permissions']);
    // console.log('=== ROLES ===');
    // console.log(payload.roles);
    // console.log(payload['https://name-base-api/roles']);
        
    // Check for roles - Auth0 typically uses a namespace for custom claims
    // const namespace = 'https://nam2e-base-api/';
    // if (payload[`${namespace}roles`]) {
    //   c.set('roles', payload[`${namespace}roles`]);
    // }

    // Log the entire payload to see all available claims
    // console.log('JWT verified, payload:', payload);
    // console.log('Complete JWT payload:', JSON.stringify(payload, null, 2));

    // 5. Store user info in the context for route handlers
    // c.set('user', payload);
    // c.set('user', 
    //   ...payload,
    //   permissions
    // );

    // !Debug
   const namespace = 'https://name-base-api/';
    if (payload[`${namespace}roles`]) {
      c.set('roles', payload[`${namespace}roles`]);
    } else if (payload.roles) {
      c.set('roles', payload.roles);
    }

    // console.log('Permissions:', permissions);
    // console.log('Roles:', roles);

    c.set('user', payload);

    // 6. Continue to the route handler
    await next();
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    return c.json({ error: 'Invalid token' }, 401);
  }
};
