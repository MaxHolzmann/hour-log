import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-slate-600">
      <div className="text-white">
        <a href="/" className="text-xl font-bold">
          Home
        </a>
      </div>
      <div>
        {session ? (
          <button onClick={() => signOut()} className="text-white">
            Sign Out
          </button>
        ) : (
          <a href="/api/auth/signin" className="text-white">
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
