import { useAuth0 } from '@auth0/auth0-react';

function LoginRedirectButton() {
  const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        audience: 'https://name-base-api',
        scope: 'openid profile email offline_access read:names create:names update:names delete:names admin:access',
      }
    });
  };

  return (
    <a
      onClick={() => loginWithRedirect()}
      // onClick={handleLogin}
      className="justify-start"
    >
      Login with Redirect
    </a>
  );
}

export default LoginRedirectButton;
