import { api } from '../services/api';
import { useState, useEffect } from 'react';

function NameList({ refresh, onEditClick, onDeleteSuccess }) {
  const [names, setNames] = useState([]);

  const fetchNames = async () => {
    try {
      const data = await api.getNames();
      setNames(data);
    } catch (err) {
      console.error('Error fetching all names:', err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.deleteName(id);

      onDeleteSuccess();  // This triggers a refresh of the whole list
    } catch (err) {
      console.error('Error deleting name:', err);
    }
  };

  // Effect to fetch names on mount and when refresh changes
  useEffect(() => {
    fetchNames(); // Fetch names on mount
  }, [refresh]); // Dependency - Refetch when refresh changes

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="bg-base-300">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Created At</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {names.map((name) => (
            <tr key={name.id} className="hover">
              <td className="font-medium">{name.first_name}</td>
              <td>{name.last_name}</td>
              <td className="text-sm opacity-75">{new Date(name.created_at).toLocaleString()}</td>
              <td>
                <div className="flex justify-center gap-2">
                  <button
                    className="btn btn-xs btn-outline btn-info"
                    onClick={() => onEditClick(name)}
                    aria-label={`Edit ${name.first_name} ${name.last_name}`}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-xs btn-outline btn-error"
                    onClick={() => handleDeleteClick(name.id)}
                    aria-label={`Delete ${name.first_name} ${name.last_name}`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NameList;
