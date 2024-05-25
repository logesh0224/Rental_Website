import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HotelType } from '../../../backend/src/shared/types';
import { AiFillStar } from 'react-icons/ai';

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col lg:flex-row border border-slate-300 rounded-lg p-4 lg:p-2 xl:p-4 gap-4 lg:gap-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="relative overflow-hidden rounded-lg w-60 h-36 lg:w-49 lg:h-32 xl:w-63 xl:h-48">
        <Link to={`/detail/${hotel._id}`}>
          <img
            src={hotel.imageUrls[0]}
            className="object-cover w-full h-full"
            alt={hotel.name}
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <Link to={`/detail/${hotel._id}`} className="ml-1 text-sm">
              {hotel.type}
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name} -
            </Link>
            <span className="text-l font-bold cursor-pointe">
              {hotel.country}
            </span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="line-clamp-4">
            {hotel.description}
          </Link>
          <Link to={`/detail/${hotel._id}`} className="text-l font-bold">
            BedRoom: {hotel.adultCount}
            <div>Bathroom: {hotel.childCount}</div>
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          {hotel.facilities.slice(0, 3).map((facility, index) => (
            <span
              key={index}
              className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
            >
              {facility}
            </span>
          ))}
          <span className="text-sm">
            {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <span className="font-bold">Rs-/{hotel.pricePerMonth} per Month</span>
        <Link
          to={`/detail/${hotel._id}`}
          className="bg-green-600 text-white py-1 px-2 font-bold text-xs max-w-fit hover:bg-green-500 mt-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          I'm Interested
        </Link>
        <button
          className={`bg-green-600 text-white py-1 px-2 font-bold text-xs max-w-fit w-auto hover:bg-green-500 ${
            liked ? 'text-red-500' : ''
          } mt-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105`}
          onClick={handleLike}
        >
          {liked ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default SearchResultsCard;
