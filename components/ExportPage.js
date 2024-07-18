import React, { forwardRef } from "react";

const ExportPage = forwardRef((props, ref, entries) => {
  console.log(entries);

  entries = [
    {
      hours: 1,
      date: "2021-10-10",
    },
    { hours: 2, date: "2022-11-21" },
  ];

  return (
    <>
      <div ref={ref} className="bg-orange-500 text-white text-6xl">
        {entries.map((entry, index) => (
          <div className="grid grid-cols-2" key={index}>
            <p>Hours: {entry.hours}</p>
            <p>Date: {entry.date}</p>
          </div>
        ))}
      </div>
    </>
  );
});

export default ExportPage;
