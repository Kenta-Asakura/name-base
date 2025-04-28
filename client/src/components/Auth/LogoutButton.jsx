import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <a
      onClick={() => logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })}
      className="justify-start"
    >
      Log Out
    </a>
  );
}

export default LogoutButton;
