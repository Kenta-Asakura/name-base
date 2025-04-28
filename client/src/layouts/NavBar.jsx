import { useAuth0 } from '@auth0/auth0-react';
import LoginPopupButton from '../components/Auth/LoginPopupButton';
import LoginRedirectButton from '../components/Auth/LoginRedirectButton';
import LogoutButton from '../components/Auth/LogoutButton';
// import UserProfile from '../components/Auth/UserProfile';

function Navbar({ toggleForm }) {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();

  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 right-0 z-50 shadow-md px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">NameBase</a>
      </div>

      <div className="flex-none gap-2">
        {isAuthenticated && (
          <button
            onClick={toggleForm}
            className="btn btn-primary btn-sm md:btn-md rounded-full"
          >
            Add Name
          </button>
        )}

        {!isLoading && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              {isAuthenticated ? (
                <>
                  <li>
                    <a className="justify-between">
                      {user?.name}
                      <span className="badge">User</span>
                    </a>
                  </li>
                  <li><a>{user?.email}</a></li>
                  <li><LogoutButton /></li>
                </>
              ) : (
                <>
                  <li><LoginPopupButton /></li>
                  <li><LoginRedirectButton></LoginRedirectButton></li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
