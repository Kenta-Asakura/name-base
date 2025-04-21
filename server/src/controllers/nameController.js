import { nameModel } from "../models/nameModel.js";

export const nameController = {
  async getAllNames(c) {
    try {
      console.log('Fetching all names from database...');
      const names = await nameModel.findAll();
      // console.log('Names retrieved:', JSON.stringify(names, null, 2));
      return c.json(names)
    } catch (error) {
      console.error('Error fetching names', error);
      return c.json({error: 'Failed to fetch names'}, 500);
    }
  }
};
