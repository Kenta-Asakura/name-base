import './App.css';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import NavBar from './layouts/NavBar';
import NameList from './components/NameList';
import SharedNameForm from './components/SharedNameForm';

// ! TEST
import TestApi from './components/Auth/TestApi';

function App() {
  const [refreshCounter, setRefreshCounter] = useState(0); // * Refreshes names list
  const [selectedName, setSelectedName] = useState(null); // * = name object containing (first, last, id)
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuth0();

  // Determine if we're in edit mode
  const isEditMode = selectedName !== null;

  // Combined handler for both add and edit operations
  const handleNameSaved = () => {
    setRefreshCounter(prevCounter => prevCounter + 1);
    setShowForm(false);
    setSelectedName(null);
  };

  const handleEditClick = (name) => {
    setSelectedName(name);
    setShowForm(true);
  };

  const handleNameDeleted = () => {
    setRefreshCounter(prevCounter => prevCounter + 1);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedName(null); // Important: reset selected name when closing form
  };

  return (
    <>
      <NavBar toggleForm={() => setShowForm(true)} />

      {/* Names Table */}
      <div className="min-h-screen bg-base-200 px-4 py-20 md:px-8">

      {/* ! TEST */}
      {/* <TestApi></TestApi> */}

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`card bg-base-100 shadow-xl ${!showForm ? 'lg:col-span-2' : ''}`}>
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title">Registered Names</h2>

                  {/* Mobile Add Name Button */}
                  {isAuthenticated &&
                    <button
                      className="btn btn-sm btn-primary lg:hidden"
                      onClick={() => {
                        showForm ?
                          handleFormClose() :
                          setShowForm(true)
                      }}
                    >
                      {showForm ? 'Hide Form' : 'Add Name'}
                    </button>
                  }
                </div>

                <NameList
                  refresh={refreshCounter}
                  onEditClick={handleEditClick}
                  onDeleteSuccess={handleNameDeleted}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {showForm && (
        <SharedNameForm
          name={selectedName}
          onSuccess={handleNameSaved}
          onClose={handleFormClose}
          formTitle={isEditMode ? "Edit Name" : "Add New Name"}
          submitButtonText={isEditMode ? "Save" : "Add Name"}
        />
      )}
    </>
  )
};

export default App;
