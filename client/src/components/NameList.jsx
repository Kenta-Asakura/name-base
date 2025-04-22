import { api } from '../services/api';
import { useState, useEffect } from 'react';

function NameList() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Fetch names when component mounts
    const fetchNames = async () => {
      try {
        const data = await api.getNames();
        setNames(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNames();
  }, []);

  // console.log(names); // * TEST

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {names.map((name) => (
            <tr key={name.id}>
              <td>{name.id}</td>
              <td>{name.first_name}</td>
              <td>{name.last_name}</td>
              <td>{new Date(name.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NameList;
