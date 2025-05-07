import { useState, useEffect } from "react";
import { api } from "../services/api";
import Modal from "./UI/Modal";
import { useAuth0 } from '@auth0/auth0-react';

function SharedNameForm({
  name = null, // * Edit mode if provided. Otherwise, Add mode
  onClose,
  onSuccess,
  formTitle = "Add New Name", // * Customizable title
  submitButtonText = "Add Name" // * Customizable button text
}) {
  const [firstName, setFirstName] = useState(''); // *
  const [lastName, setLastName] = useState(''); // *
  const [errors, setErrors] = useState({});
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // Set initial values if editing (when name prop is provided)
  useEffect(() => {
    if (name) {
      setFirstName(name.first_name);
      setLastName(name.last_name);
    }
  }, [name]);

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s\-]+$/;

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (firstName.length > 50) {
      newErrors.firstName = "First name must be less than 50 characters";
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName = "First name can only contain letters, spaces, and hyphens";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (lastName.length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters";
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName = "Last name can only contain letters, spaces, and hyphens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      const token = await getAccessTokenSilently();

      if (name) {
        await api.updateName(name.id, firstName, lastName, token);
      } else {
        await api.addName(firstName, lastName, token);
      }

      // Clear form after successful submission
      setFirstName('');
      setLastName('');
      setErrors({});

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
      <div className="card min-w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-2">{formTitle}</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.firstName}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.lastName}</span>
                </label>
              )}
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
