import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  return (
    <>
      <div className="text-center">
        <h1>Login</h1>
      </div>
    </>
  );
}
