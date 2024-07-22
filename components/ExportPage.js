import React, { forwardRef } from "react";

const ExportPage = forwardRef((props, ref) => {
  const { entries } = props;

  const total = entries.reduce((acc, entry) => acc + entry.hours, 0);

  const entered = entries;

  entered.map((entry) => {
    entry.hours = entry.hours;
    entry.date = new Date(entry.date).toLocaleDateString("US-EN");
  });

  return (
    <>
      <div
        ref={ref}
        className="bg-white border-4 border-orange-400  text-xl w-screen h-screen flex flex-col gap-10 items-center"
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl mt-6">Hour Log Report</h1>
          <h2 className="text-2xl">Generated by Maximilian Holzmann</h2>
        </div>

        <div className="flex justify-center place-items-center flex-col border rounded-xl border-orange-300 text-2xl p-3">
          {entries &&
            entered.map((entry, index) => (
              <div className="grid grid-cols-2" key={index}>
                <p>Hours: {entry.hours}</p>
                <p>Date: {entry.date}</p>
              </div>
            ))}
          <p className="mt-10">Total Hours: {total}</p>
        </div>
      </div>
    </>
  );
});

export default ExportPage;
