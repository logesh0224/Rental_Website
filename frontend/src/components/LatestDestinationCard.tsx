import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-md"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <div
        className="w-full h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${hotel.imageUrls[0]})` }}
      ></div>

      <div className="p-4 bg-black bg-opacity-50 rounded-b-md">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold tracking-tight text-lg">
            {hotel.name}
          </span>
          <div className="flex items-center text-white">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
        </div>
        <div className="text-white line-clamp-2 mt-2">{hotel.description}</div>
        <div className="flex gap-1 mt-2">
          {hotel.facilities.slice(0, 3).map((facility, index) => (
            <span
              key={index}
              className="bg-white text-black p-1 rounded-sm font-semibold text-xs"
            >
              {facility}
            </span>
          ))}
          {hotel.facilities.length > 3 && (
            <span className="bg-white text-black p-1 rounded-sm font-semibold text-xs">
              +{hotel.facilities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
