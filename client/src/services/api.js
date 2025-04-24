const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// console.log('API URL being used:', API_URL); // ! For debugging

export const api = {
  async getNames() {
    try {
      console.log('Fetching from:', `${API_URL}/names`);
      const response = await fetch(`${API_URL}/names`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching names:', error);
      throw error;
    }
  },

  async getNameById(id) {
    try {
      const response = await fetch(`${API_URL}/names/${id}`); // ?

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching name with id ${id}:`, error);
      throw error;
    }
  },

  async addName(firstName, lastName) {
    try {
      const response = await fetch(`${API_URL}/names`, { // *
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding name:', error);
      throw error;
    }
  },

  // ! implement
  async updateName(id, firstName, lastName) {
    try {
      const response = await fetch(`${API_URL}/names/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating name with id ${id}:`, error);
      throw error;
    }
  }
};
