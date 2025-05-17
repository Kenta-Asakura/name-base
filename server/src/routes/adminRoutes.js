// server/src/routes/adminRoutes.js
import { Hono } from "hono";
import { jwtMiddleware } from "../middleware/auth.js";

const adminRouter = new Hono();

adminRouter.get('/test', jwtMiddleware, async (c) => {
  const user = c.get('user');
  console.log('Admin test called, user data:', user);
  
  // Check for admin role in various possible formats
  const roles = c.get('roles') || 
                user.roles || 
                user['https://name-base-api/roles'] || 
                [];
  
  console.log('Found roles:', roles);
  
  // Check for admin role
  const isAdmin = Array.isArray(roles) ? roles.includes('Admin') : false;
  console.log('Is admin:', isAdmin);
  
  if (!isAdmin) {
    return c.json({ 
      success: false, 
      message: 'Not an admin',
      debug: { roles }
    });
  }
  
  return c.json({ 
    success: true, 
    message: 'Admin confirmed',
    debug: { roles }
  });
});

export default adminRouter;