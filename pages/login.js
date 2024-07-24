import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="flex flex-col text-center w-screen h-screen justify-center items-center gap-10">
          <h1 className="text-6xl">Already Logged In!</h1>
          <button className="rounded-md p-3 text-white bg-green-600 border-green-600 border-2 hover:bg-white hover:text-green-600">
            <a href="/dashboard">To Dashboard</a>
          </button>
          <button
            className="rounded-md p-3 text-white bg-red-500 border-2 border-red-500 hover:bg-white hover:text-red-500"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-slate-100 w-screen h-screen">
        <div className="flex flex-col justify-content-center items-center">
          <div className="text-center">
            <h1 className="text-7xl mt-20">Hour Log</h1>
          </div>
          <form className="flex flex-col rounded-md shadow-md text-center p-10 mt-20 bg-white">
            <p className="text-sm mb-3">
              Email logins are not currently supported, please sign in with
              Google.
            </p>
            <input type="email" placeholder="Email" className="mb-4 rounded" />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 rounded "
            />
            <button
              className="bg-red-500 text-white hover:text-red-500 hover:bg-white hover:border-red-500 border-2 border-red-500 rounded-md p-2"
              onClick={() => signIn()}
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
