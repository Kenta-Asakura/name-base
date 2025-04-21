import { Hono } from "hono";
import { nameController } from "../controllers/nameController.js";

const nameRouter = new Hono();

nameRouter.get('/', nameController.getAllNames);
nameRouter.post('/', nameController.createName);

export default nameRouter;
