import { set } from "mongoose";
import { useSession, getSession } from "next-auth/react";
import {useState, useEffect} from "react"
import { themeChange } from 'theme-change';

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

  const fetchAndSetLogs = async (setLogs, setHoursSum) => {
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
        const sortedData = data
  .map(item => ({ date: new Date(item.date), hours: item.hours }))
  .map(item => ({ date: new Date(item.date.getTime() + item.date.getTimezoneOffset() * 60000), hours: item.hours }))
  .sort((a, b) => a.date.getTime() - b.date.getTime());
        
        let totalHours = 0;

        const recentData = sortedData.slice(-7);

        recentData.forEach((entry) => {
            totalHours += entry.hours;
        });

        setLogs(recentData);
        setHoursSum(totalHours);
    } catch (err) {
        console.log("Error fetching logs:", err);
    }
};


const addLog = async (date, hours, setLogs, setHoursSum) => {
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
        
        // After successfully adding the log, fetch and set logs again
        await fetchAndSetLogs(setLogs, setHoursSum);

    } catch (err) {
        console.log(err);
    }
}


      
export default function Dashboard() {


    const { data: session, status } = useSession();
    let [date, setDate] = useState([]);
    let [hours, setHours] = useState(0);
    let [logs, setLogs] = useState([]);
    let [hoursSum, setHoursSum] = useState(0);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHourLogs();

                console.log(data, "data")

                const sortedData = data
  .map(item => ({ date: new Date(item.date), hours: item.hours }))
  .map(item => ({ date: new Date(item.date.getTime() + item.date.getTimezoneOffset() * 60000), hours: item.hours }))
  .sort((a, b) => a.date.getTime() - b.date.getTime());


                console.log(sortedData, "sorted data")

                const recentData = sortedData.slice(-7);

                console.log(recentData, "recent data")

                let total = 0
                
                recentData.forEach((entry) => {
                    total += entry.hours
                })
                setHoursSum(total)


                setLogs(recentData);
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

    useEffect(() => {
        themeChange(false);
      }, []);

  return (<>

<button data-toggle-theme="light,dark" data-act-class="ACTIVECLASS"><input type="checkbox" className="toggle toggle-lg" checked /></button>


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
                <button type="button" onClick={() => addLog(date, hours, setLogs, setHoursSum)} className="btn btn-md btn-accent">Enter Log</button>

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

            <p>Hours In Last 7 Days: {hoursSum}</p>
        </div>
    </div>

    </div>
        
    </div>
    </>
  );
}
