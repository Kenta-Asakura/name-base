import { Hono } from "hono";
import { nameController } from "../controllers/nameController.js";
import { jwtMiddleware } from "../middleware/auth.js";

// ! TEST
import { requireDeletePermission } from "../middleware/permissions.js";

// ! TEST
const nameRouter = new Hono();

nameRouter.get('/', nameController.getAllNames);
nameRouter.get('/:id', nameController.getNameById);

// - Protected routes
nameRouter.post('/', jwtMiddleware, nameController.createName);
nameRouter.put('/:id', jwtMiddleware, nameController.updateName);
// nameRouter.delete('/:id', jwtMiddleware, nameController.deleteName);

// Admin-only route - only admins can delete
// - Protected routes with specific permissions
// ! TEST
nameRouter.delete('/:id', jwtMiddleware, requireDeletePermission, nameController.deleteName);

// nameRouter.post('/', jwtMiddleware, checkPermission('create:names'), nameController.createName);
// nameRouter.put('/:id', jwtMiddleware, checkPermission('update:names'), nameController.updateName);
// nameRouter.delete('/:id', jwtMiddleware, checkPermission('delete:names'), nameController.deleteName);
// nameRouter.get('/:id', jwtMiddleware, checkPermission('read:names'), nameController.getNameById);

export default nameRouter;
