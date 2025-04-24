import './App.css';
import { useState } from 'react';
import { api } from './services/api';

import NameList from './components/NameList';
import NameForm from './components/NameForm';
import EditNameModal from './components/EditNameModal';

function App() {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // * Added to control modal visibility

  const handleNameAdded = () => {
    // Increment refresh key to trigger re-fetch in NameList
    setRefreshCounter(prevCounter => prevCounter + 1);
  };

  // ! implement
  // const handleEditClick = async (id) => {
  //   try {
  //     console.log(`Edit button clicked for id: ${id}`);
  //     const name = await api.getNameById(id);
  //     console.log('Retrieved name:', name);
  //   } catch (err) {
  //     console.error('Error fetching name details:', err);
  //   }
  // };

  return (
    <>
      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Name Base</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NameForm onNameAdded={handleNameAdded} />

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Registered Names</h2>
                <NameList
                  refresh={refreshCounter}
                  setIsEditModalOpen={setIsEditModalOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen &&
        <EditNameModal
          // onNameUpdated={handleEditClick}
          onClose={() => setIsEditModalOpen(false)}
        />
      }

    </>
  )
};

export default App;
