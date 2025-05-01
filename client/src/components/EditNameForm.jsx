import { useState, useEffect } from "react";
import { api } from "../services/api";
import Modal from "./UI/Modal";
import { useAuth0 } from '@auth0/auth0-react';

function EditNameForm({ name, onNameUpdated, onClose }) {
  const [firstName, setFirstName] = useState(''); // *
  const [lastName, setLastName] = useState(''); // *
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // Sets/resets name
  useEffect(() => {
    if (name) {
      setFirstName(name.first_name);
      setLastName(name.last_name);
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      console.error("Both first name and last name are required");
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      await api.updateName(name.id, firstName, lastName, token);

      onNameUpdated(); // Notify parent about successful update
    } catch (err) {
      console.error('Error updating name:', err);
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="bg-base-100 p-4 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Edit Name</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>

            <input
              type="text"
              className="input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>

            <input
              type="text"
              className="input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </Modal>
  );
};

export default EditNameForm
