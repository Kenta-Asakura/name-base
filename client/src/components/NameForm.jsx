import { useState } from "react";
import { api } from "../services/api";
import Modal from "./UI/Modal";

function NameForm({ onNameAdded }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }

    try {
      const result = await api.addName(firstName, lastName);

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
    <Modal>
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

            <div className="form-control mt-3">
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
