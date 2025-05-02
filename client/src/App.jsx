import './App.css';
import { useState } from 'react';
import { api } from './services/api';
import { useAuth0 } from '@auth0/auth0-react';

import NavBar from './layouts/NavBar';
import NameList from './components/NameList';
import NameForm from './components/NameForm';
import EditNameForm from './components/EditNameForm';

// ! TEST
import TestApi from './components/Auth/TestApi';

function App() {
  const [refreshCounter, setRefreshCounter] = useState(0); // * Refreshes names list
  const [selectedName, setSelectedName] = useState(null); // * = name object containing (first, last, id)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuth0();


  const handleNameAdded = () => {
    setRefreshCounter(prevCounter => prevCounter + 1);
    setShowForm(false);
  };

  const handleEditClick = (name) => {
    const id = name.id;
    setSelectedName(name);
    setIsEditModalOpen(true);

    async () => {
      try {
        console.log(`Edit button clicked for id: ${id}`);
        const name = await api.getNameById(id);
        console.log('Retrieved name:', name);
      } catch (err) {
        console.error('Error fetching name details:', err);
      }
    };
  };

  const handleNameUpdated = () => {
    setRefreshCounter(prevCounter => prevCounter + 1);
    setIsEditModalOpen(false);
  };

  const handleNameDeleted = () => {
    setRefreshCounter(prevCounter => prevCounter + 1);
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

                  {isAuthenticated &&
                    <button
                      className="btn btn-sm btn-primary lg:hidden"
                      onClick={() => setShowForm(!showForm)}
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

            {showForm && (
              <NameForm
                onNameAdded={handleNameAdded}
                handleClose={() => setShowForm(false)}
              />
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditNameForm
          name={selectedName}
          onNameUpdated={handleNameUpdated}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  )
};

export default App;
