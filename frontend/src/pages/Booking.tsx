import { useQuery } from "react-query";
import * as apiClient from "../api-client";

import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";


const Booking = () => {
 
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [, setNumberOfMonths] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfMonths(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  
  if (!hotel) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <div className="flex justify-center align-items-center mr-80 ml-10">
        <BookingDetailsSummary hotel={hotel} />
      </div>
 
    </div>
  );
};

export default Booking;
