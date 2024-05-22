import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/ManageHotelForm/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (isLoading || !hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="flex flex-col lg:flex-row border border-slate-300 rounded-lg p-4 lg:p-2 xl:p-4 gap-4 lg:gap-8">
        <div className="relative overflow-hidden rounded-lg w-full lg:w-1/3">
          {hotel.imageUrls && hotel.imageUrls.map((image, index) => (
            <div key={index} className="h-[300px] shadow-lg rounded-md overflow-hidden">
              <img
                src={image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <AiFillStar key={index} className="fill-yellow-400" />
                ))}
              </span>
              <span className="ml-1 text-sm">{hotel.type}</span>
            </div>
            <h1 className="text-3xl font-bold text-teal-700">{hotel.name}</h1>
            <p className="text-lg font-semibold text-teal-700">Rs {hotel.pricePerMonth} per Month</p>
            <div className="font-bold line-clamp-4 whitespace-pre-line text-blue">{hotel.description}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-bold">
            <div className="border border-gray-300 rounded-md p-4">
              <h2 className="text-lg font-bold mb-2">Facilities</h2>
              {hotel.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center bg-teal-100 rounded-full">
                    {/* Icon for each facility */}
                  </div>
                  <span>{facility}</span>
                </div>
              ))}
            </div>
            <div className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">Room Details</h2>
              <div>
                <p className="mb-2">Type: {hotel.type}</p>
                <p className="mb-2">No of BedRooms: {hotel.adultCount}</p>
                <p className="mb-2">No of Bathrooms: {hotel.childCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {hotel.imageUrls && hotel.imageUrls.slice(1).map((image, index) => (
          <div key={index} className="h-[300px] shadow-lg rounded-md overflow-hidden">
            <img
              src={image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>


      <div className="p-4 border border-slate-300 rounded-md shadow-md bg-white mt-4">
        <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
      </div>
    </div>
  );
};

export default Detail;
