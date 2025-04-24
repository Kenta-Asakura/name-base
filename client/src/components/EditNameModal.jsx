import { useState, useEffect } from "react";
import { api } from "../services/api";

function EditNameModal({ name, onNameUpdate, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Set initial values when modal opens with a name
  useEffect(() => {
    if (name) {
      setFirstName(name.first_name);
      setLastName(name._name);
    }
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.updateName(name.id, firstName, lastName);
    } catch (err) {
      console.error('Error updating name:', err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default EditNameModal
