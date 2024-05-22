import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useState } from "react";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  const [expandedHotel, setExpandedHotel] = useState<string | null>(null);

  if (!hotelData || hotelData.length === 0) {
    return <div className="text-xl text-center font-bold">No Hotels found</div>;
  }

  const toggleExpanded = (id: string) => {
    if (expandedHotel === id) {
      setExpandedHotel(null);
    } else {
      setExpandedHotel(id);
    }
  };

  return (
    <div className="space-y-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-4xl font-bold text-center">My Houses for Rent</h1>
      <Link
        to="/add-hotel"
        className="block w-full max-w-xs mx-auto bg-teal-700 text-white text-xl font-bold py-3 rounded-lg shadow-md hover:bg-teal-600 text-center transition duration-300 ease-in-out"
      >
        Click to Add Property
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="border border-teal-300 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{hotel.name}</h2>
              <p className={`text-gray-700 mb-4 ${expandedHotel === hotel._id ? 'block' : 'truncate'}`}>
                {hotel.description}
              </p>
              {hotel.description.length > 200 && (
                <button
                  className="text-teal-700 font-semibold hover:underline"
                  onClick={() => toggleExpanded(hotel._id)}
                >
                  {expandedHotel === hotel._id ? 'Show Less' : 'Read More'}
                </button>
              )}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <BsMap className="mr-2" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="flex items-center">
                  <BsBuilding className="mr-2" />
                  {hotel.type}
                </div>
                <div className="flex items-center">
                  <BiMoney className="mr-2" />
                  £{hotel.pricePerMonth} per Month
                </div>
                <div className="flex items-center">
                  <BiHotel className="mr-2" />
                  {hotel.adultCount} BedRoom, {hotel.childCount} Bathroom
                </div>
                <div className="flex items-center">
                  <BiStar className="mr-2" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
            </div>
            <div className="p-4 bg-teal-700 text-white rounded-b-lg flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-teal-500 text-white text-xl font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Edit Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
