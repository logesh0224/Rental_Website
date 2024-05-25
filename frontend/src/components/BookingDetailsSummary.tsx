import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const BookingDetailsSummary = ({ hotel }: Props) => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/seller/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        hotelId: hotel._id, // Ensure the hotel ID is sent
      }),
    });

    if (response.ok) {
      navigate("/search"); // Redirect to the home page
    } else {
      navigate('/search')
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-4xl w-full p-8 bg-gray-100 rounded-lg shadow-md flex flex-col items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/8089/8089114.png" alt="Contact" className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Seller Details</h2>
          </div>
          <div>
            <p className="text-lg font-medium text-black mb-1">Name:</p>
            <p className="text-lg font-medium text-gray-900">{hotel.sellerName}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-black mb-1">Phone Number:</p>
            <p className="text-lg font-medium text-gray-900">{hotel.sellerPhoneNumber}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-black mb-1">Email:</p>
            <p className="text-lg font-medium text-gray-900">{hotel.sellerEmail}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-black mb-1">Address:</p>
            <p className="text-lg font-medium text-gray-900">{hotel.sellerAddress}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              type="email"
              placeholder="Get In Email"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
