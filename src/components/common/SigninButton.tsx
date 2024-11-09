import { useCustomWallet } from "../../contexts/CustomWallet";

export default function SignInButton() {
  const { redirectToAuthUrl } = useCustomWallet();

  return (
    <button
      onClick={() => {
        redirectToAuthUrl();
      }}
    >
      Sign in with Google
    </button>
  );
}