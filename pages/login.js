import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Already Logged In!</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      <h1>Hour Log</h1>
      <button onClick={() => signIn()}>Sign in with Google</button>
    </>
  );
}
