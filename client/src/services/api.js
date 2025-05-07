const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// console.log('API URL being used:', API_URL); // ! For debugging

// Common headers for all requests
const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

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

  async getNameById(id, token) {
    try {
      const headers = getHeaders(token);

      const response = await fetch(`${API_URL}/names/${id}`, {
        headers
      }); // ?

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching name with id ${id}:`, error);
      throw error;
    }
  },

  async addName(firstName, lastName, token) {
    try {
      const headers = getHeaders(token);

      // const response = await fetch(`${API_URL}/names/${id}`); // ?
      const response = await fetch(`${API_URL}/names`, { // *
        method: 'POST',
        headers,
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

  async updateName(id, firstName, lastName, token) {
    try {
      const headers = getHeaders(token);

      const response = await fetch(`${API_URL}/names/${id}`, {
        method: 'PUT',
        headers,
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
  },

  async deleteName(id, token) {
    try {
      const headers = getHeaders(token);

      const response = await fetch(`${API_URL}/names/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error deleting name with id ${id}:`, error);
      throw error;
    }
  }
};
