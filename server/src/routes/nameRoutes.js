import { Hono } from "hono";
import { nameController } from "../controllers/nameController.js";

const nameRouter = new Hono();

// Get all names
nameRouter.get('/', nameController.getAllNames);

// Get a single name by id
nameRouter.get('/:id', nameController.getNameById);

// Create a new name
nameRouter.post('/', nameController.createName);

// Update a name

// Delete a name

export default nameRouter;
