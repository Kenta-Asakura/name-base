import { useState } from "react";
import { api } from "../services/api";
import Modal from "./UI/Modal";
import { useAuth0 } from '@auth0/auth0-react';

function NameForm({ onNameAdded, handleClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const result = await api.addName(firstName, lastName, token);

      setFirstName('');
      setLastName('');

      // Notify parent component to refresh the list
      if (onNameAdded) {
        onNameAdded(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal onClose={handleClose}>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-2">Add New Name</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-3"
          >
            <div className="form-control flex flex-col lg:flex-row gap-3 ">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>

              <input
                type="text"
                placeholder="Enter first name"
                className="input input-bordered"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-control flex flex-col lg:flex-row gap-3 ">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>

              <input
                type="text"
                placeholder="Enter last name"
                className="input input-bordered"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-3 flex flex-row gap-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Name
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
};

export default NameForm;
