import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, new Date(), new Date(), adultCount, 0);
    navigate("/search");
  };

  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 flex items-center gap-4"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        <div className="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <MdTravelExplore size={25} className="ml-2 text-teal-700" />
          <input
            placeholder="Where are you going?"
            className="w-full p-2 text-gray-700 focus:outline-none"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
        <input
          type="number"
          placeholder="Adults"
          className="w-20 bg-white border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none"
          value={adultCount}
          onChange={(event) => setAdultCount(parseInt(event.target.value))}
        />
        <button
          type="submit"
          className="bg-teal-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-300 focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
