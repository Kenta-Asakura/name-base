import { Hono } from "hono";
import { nameController } from "../controllers/nameController.js";
import { jwtMiddleware } from "../middleware/auth.js";

// ! TEST

const nameRouter = new Hono();

nameRouter.get('/', nameController.getAllNames);

// - Protected routes
nameRouter.post('/', jwtMiddleware, nameController.createName);
nameRouter.put('/:id', jwtMiddleware, nameController.updateName);
nameRouter.delete('/:id', jwtMiddleware, nameController.deleteName);
nameRouter.get('/:id', jwtMiddleware, nameController.getNameById);
// Admin-only route - only admins can delete
// nameRouter.delete('/:id', jwtMiddleware, nameController.deleteName);

// - Protected routes with specific permissions
// nameRouter.post('/', jwtMiddleware, checkPermission('create:names'), nameController.createName);
// nameRouter.put('/:id', jwtMiddleware, checkPermission('update:names'), nameController.updateName);
// nameRouter.delete('/:id', jwtMiddleware, checkPermission('delete:names'), nameController.deleteName);
// nameRouter.get('/:id', jwtMiddleware, checkPermission('read:names'), nameController.getNameById);

export default nameRouter;
