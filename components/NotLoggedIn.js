import { signIn } from "next-auth/react";

const NotLoggedIn = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen gap-10">
        <h1 className="text-7xl">Not Logged in!</h1>
        <button className="bg-red-500 text-white hover:text-red-500 hover:bg-white hover:border-red-500 border-2 border-red-500 rounded-md p-2">
          <a href="/api/auth/signin">Sign in with Google</a>
        </button>
      </div>
    </>
  );
};

export default NotLoggedIn;
