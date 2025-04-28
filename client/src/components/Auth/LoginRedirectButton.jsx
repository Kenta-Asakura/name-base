import { useAuth0 } from '@auth0/auth0-react';

function LoginRedirectButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <a
      onClick={() => loginWithRedirect()}
      className="justify-start"
    >
      Login with Redirect
    </a>
  );
}

export default LoginRedirectButton;
