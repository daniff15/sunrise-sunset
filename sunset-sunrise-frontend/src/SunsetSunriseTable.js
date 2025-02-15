import React from "react";

const SunsetSunriseTable = ({ data }) => {
  if (!data) return null;

  return (
    <table className="table-auto w-full text-sm text-left text-gray-600 mt-4">
      <thead className="bg-gray-200">
        <tr className="text-center">
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Sunrise</th>
          <th className="px-4 py-2">Sunset</th>
          <th className="px-4 py-2">Golden Hour</th>
          <th className="px-4 py-2">Solar Noon</th>
          <th className="px-4 py-2">Day Length</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-t text-center">
            <td className="px-4 py-2">{item.date}</td>
            <td className="px-4 py-2">{item.sunrise}</td>
            <td className="px-4 py-2">{item.sunset}</td>
            <td className="px-4 py-2">{item.golden_hour || "-"}</td>
            <td className="px-4 py-2">{item.solar_noon}</td>
            <td className="px-4 py-2">
              {item.day_length === "NaN:NaN:NaN" ? "0" : item.day_length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SunsetSunriseTable;
