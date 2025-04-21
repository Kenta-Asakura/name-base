import './App.css';
import NameList from './components/NameList';
import NameForm from './components/NameForm';

function App() {
  return (
    <>
      <div className="min-h-screen bg-base-200 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Name Registry</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NameForm />

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Registered Names</h2>
                <NameList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default App;
