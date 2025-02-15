import React from "react";

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date<span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
