import { useSession, signIn, signOut } from "next-auth/react";
import {useState} from "react"


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



export default function Dashboard() {

    const handleDate = (e) => {
        setDate(e.target.value)
    }

    const handleHours = (e) => {
        setHours(e.target.value)
    }

    let [date, setDate] = useState([]);
    let [hours, setHours] = useState(0);

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
                <button type="button" onClick={addLog(date, hours)} className="rounded-xl bg-green-400 text-white p-2 text-xl">Enter Log</button>
            </form>
        </div>
    </div>
    <div>
        <h2 className='text-2xl'>Hour Log</h2>
    </div>

    </div>
        
    </div>
    </>
  );
}
