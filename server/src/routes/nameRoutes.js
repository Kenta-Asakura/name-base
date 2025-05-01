import { Hono } from "hono";
import { nameController } from "../controllers/nameController.js";
import { jwtMiddleware } from "../middleware/auth.js";

const nameRouter = new Hono();

// Get all names
nameRouter.get('/', nameController.getAllNames);

// Get a single name by id
nameRouter.get('/:id', nameController.getNameById);

// Create a new name
nameRouter.post('/', nameController.createName);

// Update a name
nameRouter.put('/:id', nameController.updateName);

// Delete a name
nameRouter.delete('/:id', nameController.deleteName);

// Protected routes
nameRouter.post('/', jwtMiddleware, nameController.createName);
nameRouter.put('/:id', jwtMiddleware, nameController.updateName);
nameRouter.delete('/:id', jwtMiddleware, nameController.deleteName);
nameRouter.get('/:id', jwtMiddleware, nameController.getNameById);

export default nameRouter;
