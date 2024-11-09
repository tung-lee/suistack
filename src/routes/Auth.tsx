
import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback(); // This hook will handle the callback from the authentication provider

  useEffect(() => {}, [handled]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">Loading...</div>
    </div>
  );
}