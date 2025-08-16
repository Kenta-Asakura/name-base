import { Hono } from "hono";
import { nameController } from "../controllers/nameController.js";
import { jwtMiddleware } from "../middleware/auth.js";

// ! TEST
import { requirePermission } from "../middleware/permissions.js";

// ! TEST
const nameRouter = new Hono();

nameRouter.get('/', nameController.getAllNames);
// nameRouter.get('/:id', nameController.getNameById);

// - Protected routes
// nameRouter.post('/', jwtMiddleware, nameController.createName);
// nameRouter.put('/:id', jwtMiddleware, nameController.updateName);
// nameRouter.delete('/:id', jwtMiddleware, nameController.deleteName);


// - Protected routes with specific permissions (Auth0)
// ! TEST
// nameRouter.get('/', requirePermission('read:names'), nameController.getAllNames);
nameRouter.get('/', jwtMiddleware, requirePermission('read:names'), nameController.getAllNames);
// * To be implemented
// nameRouter.get('/:id', jwtMiddleware, requirePermission(), nameController.getNameById);
nameRouter.post('/', jwtMiddleware, requirePermission('create:names'), nameController.createName);
nameRouter.put('/:id', jwtMiddleware, requirePermission('update:names'), nameController.updateName);
nameRouter.delete('/:id', jwtMiddleware, requirePermission('delete:names'), nameController.deleteName);

export default nameRouter;
