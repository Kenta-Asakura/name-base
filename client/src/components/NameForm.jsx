import { useState } from "react";
import { api } from "../services/api";

function NameForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }

    try {
      await api.addName(firstName, lastName);

      // Clear form after successful submission
      setFirstName('');
      setLastName('');

      // ! To be implemented
      // Notify parent component to refresh the list
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Add New Name</h2>

        <form
          className=""
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>

            <input
              type="text"
              placeholder="Enter first name"
              className="input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>

            <input
              type="text"
              placeholder="Enter last name"
              className="input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-control mt-6">
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
  )
}

export default NameForm;
