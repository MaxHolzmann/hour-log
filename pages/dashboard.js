import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { themeChange } from "theme-change";
import Datepicker from "react-tailwindcss-datepicker";
import { useReactToPrint } from "react-to-print";
import ExportPage from "@/components/ExportPage";

/* Ideas: 
Export as PDF to send to employer
Delete button on individual hour logs in case of mistake
Page of ALL hour logs
Authentication
*/

const fetchHourLogs = async () => {
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
      .map((item) => ({ date: new Date(item.date), hours: item.hours }))
      .map((item) => ({
        date: new Date(
          item.date.getTime() + item.date.getTimezoneOffset() * 60000
        ),
        hours: item.hours,
      }))
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
  };
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
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [date, setDate] = useState([]);
  const [hours, setHours] = useState(0);
  const [logs, setLogs] = useState([]);
  const [hoursSum, setHoursSum] = useState(0);
  const [dateRangeValue, setDateRangeValue] = useState([]);
  const [dateRangeHours, setDateRangeHours] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [printDates, setPrintDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleValueChange = (newValue) => {
    setDateRangeValue(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHourLogs();
        const sortedData = data
          .map((item) => ({ date: new Date(item.date), hours: item.hours }))
          .map((item) => ({
            date: new Date(
              item.date.getTime() + item.date.getTimezoneOffset() * 60000
            ),
            hours: item.hours,
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime());
        const recentData = sortedData.slice(-7);
        let total = 0;
        recentData.forEach((entry) => {
          total += entry.hours;
        });
        setHoursSum(total);
        setLogs(recentData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [session, dateRangeValue]);

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleHours = (e) => {
    setHours(e.target.value);
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  const pullHoursRanged = async (startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/fetchentry/?startDate=" + startDate + "&endDate=" + endDate,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      const data = await response.json();
      console.log(data);

      const dataMap = data.map((entry) => {
        return {
          hours: entry.hours,
          date: entry.date,
        };
      });
      setPrintDates(dataMap);

      const rangedHours = data.reduce((acc, entry) => acc + entry.hours, 0);
      setDateRangeHours(rangedHours);

      setIsLoading(false);
    } catch (err) {
      console.log("Error fetching logs:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && printDates.length > 0) {
      handlePrint();
    }
  }, [isLoading, printDates]);

  return (
    <>
      <button data-toggle-theme="light,dark" data-act-class="ACTIVECLASS">
        <input type="checkbox" className="toggle toggle-lg" checked readOnly />
      </button>

      <div className="grid grid-cols-1 text-center m-5">
        <h1 className="text-5xl m-10">Dashboard</h1>

        <div className="md:grid grid-cols-1 lg:flex flex-row justify-center gap-10">
          <div className="flex flex-col justify-center items-center flex-1">
            <h2 className="text-2xl">Enter Hours</h2>
            <div className="flex-grow rounded-xl bg-slate-300 drop-shadow-md p-5 m-10 w-full">
              <form>
                <div className="flex flex-col  gap-4 p-2">
                  <label>Date</label>
                  <input
                    onChange={handleDate}
                    className="rounded-xl"
                    type="date"
                  ></input>
                  <label>Hours Worked</label>
                  <input
                    onChange={handleHours}
                    className="rounded-xl"
                    type="number"
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={() => addLog(date, hours, setLogs, setHoursSum)}
                  className="btn btn-md btn-accent mt-7 w-1/2"
                >
                  Enter Log
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center flex-1">
            <h2 className="text-2xl">Hour Log</h2>
            <div className="flex-grow bg-slate-300 drop-shadow-md p-5 m-10 w-full rounded-xl">
              <div className="grid grid-cols-2 text-xl">
                <p>Date</p>
                <p>Hours</p>
              </div>
              {logs.map((entry) => {
                return (
                  <div
                    key={entry.date}
                    className="bg-slate-500 m-2 rounded-xl grid grid-cols-2 text-white"
                  >
                    <p>{new Date(entry.date).toLocaleDateString("en-US")}</p>
                    <p>{entry.hours}</p>
                  </div>
                );
              })}
              <p>Hours In Last 7 Days: {hoursSum}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl">Export Hours Report</h1>
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center gap-5 bg-slate-300 p-6 rounded-xl shadow-md mt-2">
            <div>
              <Datepicker
                primaryColor={"orange"}
                value={value}
                onChange={handleValueChange}
                showShortcuts={true}
              />
            </div>
            <button
              onClick={() =>
                pullHoursRanged(
                  dateRangeValue.startDate,
                  dateRangeValue.endDate
                )
              }
              className="btn glass bg-white"
            >
              Export Report
            </button>
            <div className="hidden">
              <ExportPage ref={componentRef} entries={printDates} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
