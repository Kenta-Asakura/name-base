import { useAuth0 } from '@auth0/auth0-react';

function LoginPopupButton() {
  const { loginWithPopup } = useAuth0();

  return (
    <a
      onClick={() => loginWithPopup()}
      className="justify-start"
    >
      Login with Popup
    </a>
  );
}

export default LoginPopupButton;
