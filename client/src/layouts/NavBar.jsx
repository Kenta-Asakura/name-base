function Navbar({ toggleForm }) {
  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 right-0 z-50 shadow-md px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">NameBase</a>
      </div>

      <div className="flex-none">
        <button
          onClick={toggleForm} // ! to be implemented
          className="btn btn-primary btn-sm md:btn-md rounded-full"
        >
          Add Name
        </button>
      </div>
    </div>
  );
}

export default Navbar;
