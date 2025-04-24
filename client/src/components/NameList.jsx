import { api } from '../services/api';
import { useState, useEffect } from 'react';

function NameList({ refresh, setIsEditModalOpen }) {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);

  // console.log(names); // * TEST

  const fetchNames = async () => {
    try {
      const data = await api.getNames();
      setNames(data);
    } catch (err) {
      console.error('Error fetching all names:', err);
    }
  };

  // Effect to fetch names on mount and when refresh changes
  useEffect(() => {
    fetchNames(); // Fetch names on mount
  }, [refresh]); // Dependency - Refetch when refresh changes

  // Gets the id
  const handleEditClick = (name) => {
    console.log(`Clicked btn for ${name}`); // ! test
    setSelectedName(name);
    setIsEditModalOpen(true); // !
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {names.map((name) => (
            <tr key={name.id}>
              <td>{name.first_name}</td>
              <td>{name.last_name}</td>
              <td>{new Date(name.created_at).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleEditClick(name.id)} // *test get by id
                  // onClick={() => handleEditClick(name)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NameList;
