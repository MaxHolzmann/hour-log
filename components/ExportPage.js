import React, { forwardRef } from "react";

const ExportPage = forwardRef((props, ref) => {
  const { entries } = props;

  console.log("entries:", entries);

  return (
    <>
      <div
        ref={ref}
        className="bg-white border-4 border-orange-400  text-xl w-screen h-screen"
      >
        <div>
          {entries &&
            entries.map((entry, index) => (
              <div className="grid grid-cols-2" key={index}>
                <p>Hours: {entry.hours}</p>
                <p>Date: {entry.date}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
});

export default ExportPage;
