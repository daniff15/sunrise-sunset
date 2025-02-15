import React from "react";

const LocationInput = ({ location, setLocation }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Location<span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mt-2 block w-full px-4 py-2 rounded-md border border-gray-300"
      />
    </div>
  );
};

export default LocationInput;
