// Define what permissions each role should have
export const ROLE_PERMISSIONS = {
  User: ['create:names', 'read:names', 'update:names'],
  Editor: ['create:names', 'read:names', 'update:names', 'delete:names'],
};

// Determine user role based on their permissions
export const getUserRole = (userPermissions = []) => {
  // If user has delete permission, they're an Editor
  if (userPermissions.includes('delete:names')) {
    return 'Editor';
  }
  
  // If user has create permission (but not delete), they're a User
  if (userPermissions.includes('create:names')) {
    return 'User';
  }
  
  // Default to no role
  return null;
};

// Check if user role can perform action
export const canDelete = (userPermissions = []) => {
  const userRole = getUserRole(userPermissions);
  return userRole === 'Editor';
};