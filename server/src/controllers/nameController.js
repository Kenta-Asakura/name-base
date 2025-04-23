import { nameModel } from "../models/nameModel.js";

export const nameController = {
  async getAllNames(c) {
    try {
      console.log('Fetching all names from database...');
      const names = await nameModel.findAll();
      return c.json(names)
    } catch (error) {
      console.error('Error fetching names', error);
      return c.json({error: 'Failed to fetch names'}, 500);
    }
  },

  async getNameById(c) {
    try {
      const id = c.req.param('id');
      console.log(`Fetching name with id ${id}...`);

      const name = await nameModel.findById(id);

      if (!name) {
        return c.json({ error: 'Name not found'}, 404);
      }
      
      return c.json(name);
    } catch (error) {
      console.error('Error fetching name by id', error);
      return c.json({ error: 'Failed to fetch name' }, 500);
    }
  },

  async createName(c) {
    try {
      const body = await c.req.json();

      // Validate input
      if (!body.firstName || !body.lastName) {
        return c.json({ error: 'First name and last name are required' }, 400);
      }

      console.log('Creating new name:', body);
      const result = await nameModel.create(body.firstName, body.lastName);
      console.log('Name created:', JSON.stringify(result, null, 2));

      return c.json(result, 201);
    } catch (error) {
      console.error('Error creating name', error);
      return c.json({error: 'Failed to create name'}, 500);
    }
  }
};
