import './App.css'

function App() {
  return (
    <>
     <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://placekitten.com/400/300"
            alt="Cute kitten"
            className="rounded-t-lg"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">DaisyUI Card</h2>
          <p>If you can see this styled card, DaisyUI is working!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Click Me</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;
