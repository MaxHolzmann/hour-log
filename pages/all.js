import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Datepicker from "react-tailwindcss-datepicker"; //leaving this as I want to implement the datepicker on this page as well
import NavBar from "@/components/NavBar";

const fetchHourLogs = async (session) => {
  try {
    const response = await fetch("/api/fetchentry?id=" + session.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default function All() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);
  const [isDeleting, setDeleting] = useState(false);

  const delLog = async (id) => {
    try {
      const response = await fetch("/api/fetchentry?id=" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      const data = await response.json();
      setDeleting(true);
      console.log("Deleted!", data);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHourLogs(session);
        const sortedData = data
          .map((item) => ({
            date: new Date(item.date),
            hours: item.hours,
            id: item._id,
          }))
          .map((item) => ({
            date: new Date(
              item.date.getTime() + item.date.getTimezoneOffset() * 60000
            ),
            hours: item.hours,
            id: item.id,
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime());
        setLogs(sortedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [session, isDeleting]);

  if (!session) {
    return (
      <>
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-10">
          <h1 className="text-7xl">Not Logged in!</h1>
          <button
            className="bg-red-500 text-white hover:text-red-500 hover:bg-white hover:border-red-500 border-2 border-red-500 rounded-md p-2"
            onClick={() => signIn()}
          >
            Sign in with Google
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1 className="text-7xl m-10 text-center">All Hours</h1>
      </div>
      <div className="flex flex-col items-center">
        {logs.map((entry) => {
          console.log(entry);
          return (
            <div
              key={entry.id}
              className="bg-slate-500 m-2 p-2 rounded-md  text-white flex justify-between w-1/2"
            >
              <p>{new Date(entry.date).toLocaleDateString("en-US")}</p>
              <p>{entry.hours}</p>
              <a
                className="bg-red-500 text-white p-2 rounded-xl w-10 text-center"
                onClick={() => delLog(entry.id)}
              >
                X
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
