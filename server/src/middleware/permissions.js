export const requirePermission = (permission) => {
  return async (c, next) => {
    const user = c.get('user');
    
    if (!user) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    const userPermissions = user.permissions || [];
    
    if (!userPermissions.includes(permission)) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    await next();
  };
};