import { canDelete, getUserRole } from '../utils/permissions.js';

export const requireDeletePermission = async (c, next) => {
  try {
    const user = c.get('user');
    
    if (!user) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    const userPermissions = user.permissions || [];
    const userRole = getUserRole(userPermissions);
    
    console.log(`Delete attempt by user with role: ${userRole} (permissions: ${userPermissions})`);
    
    if (!canDelete(userPermissions)) {
      console.log('Delete permission denied - Admin role required');
      return c.json({ 
        error: 'Admin role required to delete names',
        userRole,
        userPermissions 
      }, 403);
    }

    console.log('Delete permission granted');
    
    // Store role for controller use
    c.set('userRole', userRole);
    c.set('userPermissions', userPermissions);
    
    await next();
  } catch (error) {
    console.error('Delete permission check error:', error);
    return c.json({ error: 'Permission check failed' }, 500);
  }
};