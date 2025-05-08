import { nameModel } from "../models/nameModel.js";
import { handleError } from "../utils/errorHandler.js";

export const nameController = {
  async getAllNames(c) {
    try {
      console.log('Fetching all names from database...');
      const names = await nameModel.findAll();

      return c.json(names)
    } catch (error) {
      return handleError(c, error, 'fetching all names');
    }
  },

  async getNameById(c) {
    try {
      const id = c.req.param('id');
      const name = await nameModel.findById(id);

      if (!name) {
        throw new Error('Name not found');
      }

      return c.json(name);
    } catch (error) {
      return handleError(c, error, 'fetching name by id');
    }
  },

  async createName(c) {
    try {
      const body = await c.req.json();

      if (!body.firstName || !body.lastName) {
        throw new Error('First name and last name are required');
      }

      // console.log('Creating new name:', body);
      const result = await nameModel.create(body.firstName, body.lastName);
      // console.log('Name created:', JSON.stringify(result, null, 2));

      return c.json(result, 201);
    } catch (error) {
      return handleError(c, error, 'creating name');
    }
  },

  async updateName(c) {
    try {
      const id = c.req.param('id');
      const body = await c.req.json();

      if (!body.firstName || !body.lastName) {
        throw new Error('First name and last name are required');
      }

      console.log(`Updating name with id: ${id}`, body);
      const result = await nameModel.update(id, body.firstName, body.lastName);

      return c.json(result);
    } catch (error) {
      return handleError(c, error, 'updating name');
    }
  },

  async deleteName(c) {
    try {
      const id = c.req.param('id');

      console.log(`Deleting name with id:${id}`);
      const result = await nameModel.delete(id);

      if (!result || !result.success) {
        throw new Error(`Name with id ${id} not found`);
      }

      return c.json(result);
    } catch (error) {
      return handleError(c, error, 'deleting name');
    }
  }
};
