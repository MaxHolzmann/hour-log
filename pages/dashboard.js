import { useSession, getSession } from "next-auth/react";
import {useState, useEffect} from "react"


const addLog = async (date, hours, session) => {
    const newLog = {
        date: date,
        hours: hours,
    }
        try {
            const response = await fetch("/api/entry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newLog),
            });
            console.log("added log:", response);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchHourLogs = async (userId) => {
        try {
          const response = await fetch("/api/fetchentry", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error("Request failed with status: " + response.status);
          }
          const data = await response.json();
          console.log(data)
          return data;
        } catch (err) {
          console.log(err);
          return [];
        }
      };
      

export default function Dashboard() {

    const { data: session, status } = useSession();
    let [date, setDate] = useState([]);
    let [hours, setHours] = useState(0);
    let [logs, setLogs] = useState([]);
    let sevenDaysHours = 0;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHourLogs();
                setLogs(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [session]);

    const handleDate = (e) => {
        setDate(e.target.value)
    }

    const handleHours = (e) => {
        setHours(e.target.value)
    }


  return (<>
    <div className='text-center'>
    <h1 className="text-5xl m-10">Dashboard</h1>

    <div className='grid grid-cols-2'>

    <div className='text-center'>
        <h2 className='text-2xl'>Enter Hours</h2>
        <div className="rounded-xl bg-slate-300 drop-shadow-md p-5 m-10">
            <form>
                <div className="flex justify-center gap-4 p-2">
                <input onChange={handleDate} className="rounded-xl" type="date"></input>
                <input onChange={handleHours} className="rounded-xl" type="number"></input>
                </div>
                <button type="button" onClick={() => addLog(date, hours)} className="rounded-xl bg-green-400 text-white p-2 text-xl">Enter Log</button>
            </form>
        </div>
    </div>
    <div>
        <h2 className='text-2xl'>Hour Log</h2>
        <div className="bg-slate-300 drop-shadow-md p-5 m-10 rounded-xl">
            <div className="grid grid-cols-2 text-xl">
                <p>Date</p>
                <p>Hours</p>
            </div>
            {logs.map((entry) => {
                return (
                    <div className="bg-slate-500 m-2 rounded-xl grid grid-cols-2 text-white">
                        <p>{new Date(entry.date).toLocaleDateString('en-US')}</p>
                        <p>{entry.hours}</p>
                    </div>
                )
            })}

            <p>Hours In Last 7 Days: {sevenDaysHours}</p>
        </div>
    </div>

    </div>
        
    </div>
    </>
  );
}
