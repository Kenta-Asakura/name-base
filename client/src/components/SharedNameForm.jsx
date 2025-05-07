import { useState, useEffect } from "react";
import { api } from "../services/api";
import Modal from "./UI/Modal";
import { useAuth0 } from '@auth0/auth0-react';

function SharedNameForm({
  name = null, // * If provided, we're in edit mode. Otherwise, add mode
  onClose,
  onSuccess,
  title = "Add New Name", // Customizable title
  submitButtonText = "Add Name" // Customizable button text
}) {
  const [firstName, setFirstName] = useState(''); // *
  const [lastName, setLastName] = useState(''); // *
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // Set initial values if editing (when name prop is provided)
  useEffect(() => {
    if (name) {
      setFirstName(name.first_name);
      setLastName(name.last_name);
    }
  }, [name]);

  // Inside SharedNameForm function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!firstName.trim() || !lastName.trim()) {
      console.error("Both first name and last name are required");
      return;
    }

    try {
      const token = await getAccessTokenSilently();

      // Use different API methods based on whether we're adding or editing
      if (name) {
        await api.updateName(name.id, firstName, lastName, token);
      } else {
        await api.addName(firstName, lastName, token);
      }

      // Clear form after successful submission
      setFirstName('');
      setLastName('');

      // Notify parent component about success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error saving name:', err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-2">{title}</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-3"
          >
            <div className="form-control flex flex-col lg:flex-row gap-3">
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

            <div className="form-control flex flex-col lg:flex-row gap-3">
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
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                {submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default SharedNameForm
