import propTypes from "prop-types";
import { useState } from "react";

export const filterJobs = (jobs, location) => {
	const locationNameMatches = job => job.locationNames?.toLowerCase() === location;
	const cityNameMatches = city => city.name.toLowerCase() === location;
	const countryNameMatches = country => country.name.toLowerCase() === location;

	return jobs.filter(job => locationNameMatches(job) || job.cities.some(city => cityNameMatches(city) || countryNameMatches(city.country)));
};

export const SearchJob = ({ handleOnSearch }) => {
  const [location, setLocation] = useState("");

  const handleOnChange = ({ target: { value } }) =>
    setLocation(value.toLowerCase().trim());

  const handleOnKeyDown = ({ keyCode }) => {
    if (keyCode == 13) {
      handleOnSearch(location);
    }
  };

  return (
    <div className="px-8">
      <div className="flex items-center shadow-sm max-w-md mx-auto mt-8 focus-within:shadow-lg">
        <input
          type="text"
          className="p-2 rounded-l-md flex-1 focus:outline-none font-light text-gray-600"
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          placeholder="Enter job location: City, Country"
          aria-label="Enter Job location"
        />
        <span
          className=" bg-green-400 text-white px-4 py-2 rounded-r-md"
          onClick={() => handleOnSearch(location)}
          role="button"
        >
          Search
        </span>
      </div>
    </div>
  );
};

SearchJob.propTypes = {
  handleOnSearch: propTypes.func.isRequired,
};
