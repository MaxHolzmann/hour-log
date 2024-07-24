import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className="">
        <div className="text-center">
          <h1 className="text-8xl m-10">Hour Log</h1>
          <h2 className="text-lg italic">
            A lightweight solution for manually tracking work hours.
          </h2>
          <button className="mt-8 bg-slate-400 text-white p-3 text-xl rounded-lg shadow-sm hover:bg-white hover:text-slate-400 hover:border-2 border-slate-400">
            {session ? (
              <a href="/dashboard">Visit Dashboard</a>
            ) : (
              <a href="/login">Get Started</a>
            )}
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
}
