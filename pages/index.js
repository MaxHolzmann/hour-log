import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const variables = ["NODE_ENV", "TEST"];

  return (
    <div className='text-center'>
      <h1 className='text-orange-400 text-4xl text-center mt-10'>
        This is an example home page served using NextJS & Tailwind CSS.
      </h1>

      <button
        type='button'
        className='rounded-full  mt-5 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
      >
        <a target='_blank' onClick={() => signIn()}>
          Login Page Utilizing Auth.JS
        </a>
      </button>

      <h1 className='text-orange-400 text-4xl text-center mt-10 mb-10'>
        Make sure you have the following variables filled in your repos .env
        file!
      </h1>

      <div className='text-center content-center'>
        <h2>Required Enviornment Variables</h2>
        <ul>
          {variables.map(
            (
              variable // map through the variables array
            ) => (
              <li key={variable}>{variable}</li> // return the variable
            )
          )}
        </ul>
      </div>
    </div>
  );
}
