import Hotel from "../src/models/house";
import { HotelType } from "../src/shared/types";

export const fetchHotelById = async (hotelId: string): Promise<HotelType | null> => {
    try {
      // Your logic to fetch hotel details by ID
      const hotel = await Hotel.findById(hotelId);
  
      return hotel || null; // Return the hotel object if found, or null if not found
    } catch (error) {
      console.error('Error fetching hotel by ID:', error);
      throw new Error('Failed to fetch hotel by ID');
    }
  };
  