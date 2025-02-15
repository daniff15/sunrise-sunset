import React, { useState } from "react";
import axios from "axios";
import LocationInput from "./LocationInput";
import DateRangePicker from "./DateRangePicker";
import SunsetSunriseTable from "./SunsetSunriseTable";
import SunsetSunriseChart from "./SunsetSunriseChart";

const SunsetSunriseForm = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/sunset_sunrise",
        {
          params: {
            location: location,
            start_date: startDate,
            end_date: endDate,
          },
        }
      );

      setData(response.data.success ? response.data.data : null);
      setError(response.data.success ? null : response.data.error);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Error fetching data.");
      } else {
        setError("Error fetching data.");
      }
    }
  };

  const [activeTab, setActiveTab] = useState("table"); // Default to Table

  // Check if all fields are filled to enable the button
  const isButtonDisabled = !location || !startDate;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="m-8 max-w-3xl w-full p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Sunset and Sunrise Times
        </h1>
        <LocationInput
          {...{
            location,
            setLocation,
          }}
        />
        <DateRangePicker
          {...{ startDate, setStartDate, endDate, setEndDate }}
        />
        <button
          onClick={fetchData}
          disabled={isButtonDisabled}
          className={`mt-4 w-full py-2 rounded-lg ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Fetch Data
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {data && data.length > 0 && !error && (
          <>
            <div className="flex justify-center border-b mt-4">
              <button
                className={`px-4 py-2 flex items-center space-x-2 ${
                  activeTab === "table"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("table")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                  />
                </svg>
              </button>
              <button
                className={`px-4 py-2 flex items-center space-x-2 ml-4 ${
                  activeTab === "chart"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("chart")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              {activeTab === "table" && <SunsetSunriseTable data={data} />}
              {activeTab === "chart" && <SunsetSunriseChart data={data} />}
            </div>
          </>
        )}
        {data && data.length === 0 && !error && (
          <p className="text-black-500 mt-4">
            There is no information for this range of time for this location!
          </p>
        )}
      </div>
    </div>
  );
};

export default SunsetSunriseForm;
